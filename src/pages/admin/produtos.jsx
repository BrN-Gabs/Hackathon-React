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
  Container,
  useToast
} from "@chakra-ui/react"
import {InputForm, FormataValor, InputFormSelect, Teste} from '../../components/main';
import api from "../../services/api";

export default function ProductRegistration({ product: fetchedProduct }) {
  const toast = useToast();

  const [product, setProduct] = useState(fetchedProduct);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category_id, setCategory] = useState('');
  const [company_id, setCompany] = useState('');

  const headers = {
    'headers': {
      'Content-Type': 'application/json'
    }
  }
  

  const [errors, setErrors] = useState({name: null, photo: null, description: null, price: null, category_id: null, company_id: null});

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

    if(!category_id) {
      setErrors({category_id: 'Category is required'});
      return false;
    }

    if(!company_id) {
      setErrors({company_id: 'Company is required'});
      return false;
    }

    if(product.some(product => product.name === name && product.id !== id)) {
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

      /* const formData = new FormData();
      formData.append('photo', photo); */

      const {data} = await api.post('/product', {name, photo, description, price, category_id, company_id});

      setProduct(product.concat(data.data));
  
      setName('');
      setPhoto('');
      setDescription('');
      setPrice('');
      setCategory('');
      setCompany('');
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

      await api.put(`/product/${id}`, {name, photo, description, price, category_id, company_id}, headers);
      setProduct(product.map(product => product.id === id ? {name, photo, description, price, category_id, company_id, id: id} : product));
  
      setName('');
      setPhoto('');
      setDescription('');
      setPrice('');
      setCategory('');
      setCompany('');
      setId(null);
      toggleFormState();
      setIsLoading(false);

    }catch(err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  const handleDeleteProduct = async (id) => {
    try {
      await api.delete(`/product/${id}`);
      setProduct(product.filter(product => product.id !== id));
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

  const handleChangeCategory = (int) => {
    setCategory(int);
  }

  const handleChangeCompany = (int) => {
    setCompany(int);
  }

  const handleShowUpdateProductForm = (product) => {
    setId(product.id);
    setName(product.name);
    setPhoto(product.photo);
    setDescription(product.description);
    setPrice(product.price);
    setCategory(product.category_id);
    setCompany(product.company_id);
    setIsFormOpen(true);
  }

  const toggleFormState = () => {
    setIsFormOpen(!isFormOpen);
  }

  return (
    <Container maxW='container.xl'>
    <Box margin="4">

    <Flex color="white" justifyContent="space-between">
      <Text color="black" fontSize="2xl">Lista de Produtos</Text>
      
      <Button bgColor="#820b89" onClick={toggleFormState}><b>{isFormOpen ? '-' : '+'}</b></Button>
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
          label="Foto" 
          name="photo" 
          /* type="file" */
          value={photo} 
          onChange={e => handleChangePhoto(e.target.value)}
          error={errors.photo}
        />

        <InputForm 
          label="Descrição" 
          name="description" 
          value={description} 
          onChange={e => handleChangeDescription(e.target.value)}
          error={errors.description}
        />

        <InputForm 
          label="Preço" 
          name="price" 
          value={price} 
          onChange={e => handleChangePrice(e.target.value)}
          error={errors.price}
        />

        <InputFormSelect
          label="Categorias" 
          name="categorias"
          value={category_id} 
          type="number"
          onChange={e => handleChangeCategory(e.target.value)}
          error={errors.category_id}
          rota="/category"
        />

        <InputFormSelect
          label="Empresas" 
          name="empresas" 
          value={company_id}
          type="number"
          onChange={e => handleChangeCompany(e.target.value)}
          error={errors.company_id}
          rota="/company"
        />

        <Button fontSize="sm" alignSelf="flex-end" bgColor="#00febf" type="submit" isLoading={isLoading}>{id ? 'Atualizar' : 'Cadastrar'}</Button>
      </VStack>
    )}

    <Table variant="simple" my="10">
      <Thead bgColor="#820b89">
        <Tr>
          <Th textColor="white">Nome</Th>
          <Th textColor="white">Foto</Th>
          <Th textColor="white">Descrição</Th>
          <Th textColor="white">Preço</Th>
          <Th textColor="white">Categoria</Th>
          <Th textColor="white">Empresa</Th>
          <Th textColor="white">Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {product.map(product => (
          <Tr key={product.name}>
            <Td>{product.name}</Td>
            <Td>{product.photo}</Td>
            <Td>{product.description}</Td>
            <Td>{FormataValor(product.price)}</Td>
            <Td><Teste rota="/category/" id={product.category_id}/></Td>
            <Td><Teste rota="/company/" id={product.company_id}/></Td>
            <Td>
              <Flex justifyContent="space-between">
                <Button size="sm" fontSize="smaller" colorScheme="yellow" mr="2" onClick={() => handleShowUpdateProductForm(product)}>Editar</Button>
                <Button size="sm" fontSize="smaller" colorScheme="red" onClick={() => handleDeleteProduct(product.id)}>Remover</Button>
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>

    </Table>
    </Box>
    </Container>
  )
}


export const getServerSideProps = async () => {
  try {
    const response = await api.get('/product');
    const product= await response.data;

    return {
      props: {product}, 
    };

  } catch (err) {
    console.log(err)
    return {
      props: {}
    }
  }
}