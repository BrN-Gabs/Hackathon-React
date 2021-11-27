import {useEffect, useState} from 'react'
import {Button} from '@chakra-ui/react'
import { 
  Flex, 
  Text,
  Box,
  VStack, 
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast
} from "@chakra-ui/react"
import {InputForm, formataValor} from '../../components/main';
import api from "../../services/api";

export default function ProductRegistration({ products: fetchedProducts }) {
  const toast = useToast();

  const [products, setProducts] = useState(fetchedProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  

  const [errors, setErrors] = useState({name: null, photo: null, description: null, price: null});

  const isValidFormData = () => {
    if(!name) {
      setErrors({name: 'Name is required'});
      return false;
    }

    if(!photo) {
      setErrors({photo: 'Photo is required'});
      return false;
    }

    if(!description) {
        setErrors({description: 'Description is required'});
        return false;
    }

    if(!price) {
        setErrors({price: 'Price is required'});
        return false;
    }

    if(products.some(product => product.name === name && product._id !== id)) {
      setErrors({name: "Name already in use"});
      return
    }

    setErrors({});
    return true;
  }

  const handleSubmitCreateProduct = async (e) => {
    e.preventDefault();

    if(!isValidFormData()) return;

    try {
      setIsLoading(true);
      const {data} = await api.post('/product', {name, photo, description, price});

      setProducts(products.concat(data.data));
  
      setName('');
      setPhoto('');
      setDescription('');
      setPrice('');
      toggleFormState();
      setIsLoading(false);

      toast({
        title: "Produto cadastrado.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }catch(err) {
      console.log(err);
      setIsLoading(false);
    }

  }

  const handleSubmitUpdateProduct = async (e) => {
    e.preventDefault();

    if(!isValidFormData()) return;

    try {
      setIsLoading(true);

      await api.put(`/product/${id}`, {name, photo, description, price});
      setProducts(products.map(product => product._id === id ? {name, photo, description, price, _id: id} : product));
  
      setName('');
      setPhoto('');
      setDescription('');
      setPrice('');
      setId(null);
      toggleFormState();
      setIsLoading(false);

    }catch(err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  const handleDeleteProduct = async (_id) => {
    try {
      await api.delete(`/product/${_id}`);
      setProducts(products.filter(product => product._id !== _id));
    }catch(err) {
      console.log(err);
    }
  }

  const handleChangeName = (text) => {
    setName(text);
  }

  const handleChangePhoto = (text) => {
    setPhoto(text);
  }

  const handleChangeDescription = (text) => {
    setDescription(text);
  }

  const handleChangePrice = (float) => {
    setPrice(float);
  }


  const handleShowUpdateProductForm = (product) => {
    setId(product._id);
    setName(product.name);
    setPhoto(product.photo);
    setDescription(product.description);
    setPrice(product.price);
    setIsFormOpen(true);
  }

  const toggleFormState = () => {
    setIsFormOpen(!isFormOpen);
  }

  // useEffect(() => {
  //   api.get('/clients').then(({data}) => {
  //     setClients(data.data)
  //   })
  // }, [])

  

  return (
    <Box margin="4">

    <Flex color="white" justifyContent="space-between">
      <Text color="black" fontSize="2xl">Lista de Produtos</Text>
      
      <Button colorScheme="blue" onClick={toggleFormState}>{isFormOpen ? '-' : '+'}</Button>
    </Flex>

    { isFormOpen && (
      <VStack marginY="1rem" as="form" onSubmit={id ? handleSubmitUpdateProduct : handleSubmitCreateProduct}>
        <InputForm
          label="Nome"
          name="name"
          value={name} 
          onChange={e => handleChangeName(e.target.value)} 
          error={errors.name} 
        />

        <InputForm 
          label="Photo" 
          name="photo" 
          type="file"
          value={photo} 
          onChange={e => handleChangePhoto(e.target.value)}
          error={errors.photo}
        />

        <InputForm 
          label="Description" 
          name="description" 
          value={description} 
          onChange={e => handleChangeDescription(e.target.value)}
          error={errors.description}
        />

        <InputForm 
          label="Price" 
          name="price" 
          value={formataValor(price)} 
          onChange={e => handleChangePrice(e.target.value)}
          error={errors.price}
        />

        <Button fontSize="sm" alignSelf="flex-end" colorScheme="blue" type="submit" isLoading={isLoading}>{id? 'Atualizar' : 'Cadastrar'}</Button>
      </VStack>
    )}

    <Table variant="simple" my="10">
      <Thead bgColor="blue.500">
        <Tr>
          <Th textColor="white">Name</Th>
          <Th textColor="white">Photo</Th>
          <Th textColor="white">Description</Th>
          <Th textColor="white">Price</Th>
          <Th textColor="white">Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {/* {products.map(product => (
          <Tr key={product.name}>
            <Td>{product.name}</Td>
            <Td>{product.photo}</Td>
            <Td>{product.description}</Td>
            <Td>{formataValor(product.price)}</Td>
            <Td>
              <Flex justifyContent="space-between">
                <Button size="sm" fontSize="smaller" colorScheme="yellow" mr="2" onClick={() => handleShowUpdateProductForm(product)}>Editar</Button>
                <Button size="sm" fontSize="smaller" colorScheme="red" onClick={() => handleDeleteProduct(product._id)}>Remover</Button>
              </Flex>
            </Td>
          </Tr>
        ))} */}
      </Tbody>

    </Table>
    </Box>
  )
}


export const getServerSideProps = async () => {
  try {
    const { data } = await api.get('/product');

    return {
      props: {
        products: data.data
      }
    }
  } catch (err) {
    console.log(err)
    return {
      props: {}
    }
  }
}