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
import {InputForm} from '../../components/main';
import api from "../../services/api";

export default function CategoryRegistration({ categories: fetchedCategories }) {
  const toast = useToast();

  const [categories, setCategories] = useState(fetchedCategories);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  

  const [errors, setErrors] = useState({name: null, slug: null});

  const isValidFormData = () => {
    if(!name) {
      setErrors({name: 'Name is required'});
      return false;
    }

    if(!slug) {
      setErrors({email: 'Slug is required'});
      return false;
    }

    if(categories.some(category => category.slug === slug && category._id !== id)) {
      setErrors({slug: "Slug already in use"});
      return
    }

    setErrors({});
    return true;
  }

  const handleSubmitCreateCategory = async (e) => {
    e.preventDefault();

    if(!isValidFormData()) return;

    try {
      setIsLoading(true);
      const {data} = await api.post('/categories', {name, slug});

      setCategories(categories.concat(data.data));
  
      setName('');
      setSlug('');
      toggleFormState();
      setIsLoading(false);

      toast({
        title: "Categoria cadastrada.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }catch(err) {
      console.log(err);
      setIsLoading(false);

    }

  }

  const handleSubmitUpdateCategory = async (e) => {
    e.preventDefault();

    if(!isValidFormData()) return;

    try {
      setIsLoading(true);

      await api.put(`/categories/${id}`, {name, slug});
      setCategories(categories.map(category => category._id === id ? {name, slug, _id: id} : category));
  
      setName('');
      setSlug('');
      setId(null);
      toggleFormState();
      setIsLoading(false);

    }catch(err) {
      console.log(err);
      setIsLoading(false);

    }
  }

  const handleDeleteCategory = async (_id) => {
    try {
      await api.delete(`/categories/${_id}`);
      setCategories(categories.filter(category => category._id !== _id));
    }catch(err) {
      console.log(err);
    }
  }

  const handleChangeName = (text) => {
    setName(text);
  }

  const handleChangeSlug = (text) => {
    setSlug(text);
  }

  const handleShowUpdateCategoryForm = (category) => {
    setId(category._id);
    setName(category.name);
    setSlug(category.slug);
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
      <Text color="black" fontSize="2xl">Lista de Categorias</Text>
      
      <Button colorScheme="blue" onClick={toggleFormState}>{isFormOpen ? '-' : '+'}</Button>
    </Flex>

    { isFormOpen && (
      <VStack marginY="1rem" as="form" onSubmit={id ? handleSubmitUpdateCategory : handleSubmitCreateCategory}>
        <InputForm
          label="Nome"
          name="name"
          value={name} 
          onChange={e => handleChangeName(e.target.value)} 
          error={errors.name} 
        />

        <InputForm 
          label="Slug" 
          name="slug" 
          value={slug} 
          onChange={e => handleChangeSlug(e.target.value)}
          error={errors.slug}
        />

        <Button fontSize="sm" alignSelf="flex-end" colorScheme="blue" type="submit" isLoading={isLoading}>{id? 'Atualizar' : 'Cadastrar'}</Button>
      </VStack>
    )}

    <Table variant="simple" my="10">
      <Thead bgColor="blue.500">
        <Tr>
          <Th textColor="white">Name</Th>
          <Th textColor="white">Slug</Th>
          <Th textColor="white">Action</Th>
        </Tr>
      </Thead>
      <Tbody>
       {/* {categories.map(category => (
          <Tr key={category.slug}>
            <Td>{category.name}</Td>
            <Td>{category.slug}</Td>
            <Td>
              <Flex justifyContent="space-between">
                <Button size="sm" fontSize="smaller" colorScheme="yellow" mr="2" onClick={() => handleShowUpdateCategoryForm(category)}>Editar</Button>
                <Button size="sm" fontSize="smaller" colorScheme="red" onClick={() => handleDeleteCategory(category._id)}>Remover</Button>
              </Flex>
            </Td>
          </Tr>
        ))}  */}
      </Tbody>

    </Table>
    </Box>
  )
}


export const getServerSideProps = async () => {
  try {
    const { data } = await api.get('/categoria');

    return {
      props: {
        categories: data.data
      }
    }
  } catch (err) {
    console.log(err)
    return {
      props: {}
    }
  }
}