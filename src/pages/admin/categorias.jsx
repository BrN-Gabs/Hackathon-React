import {useEffect, useState} from 'react'
import {Button, Container} from '@chakra-ui/react'
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
import {useRouter} from "next/router";

export default function CategoryRegistration({ category: fetchedCategory }) {

  const toast = useToast();

  const [category, setCategory] = useState(fetchedCategory);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState(null);
  const [name, setName] = useState('');

  const [errors, setErrors] = useState({name: null});

  const router = useRouter();

  const isValidFormData = () => {
    if (!name) {
      setErrors({name: 'Name is required'});
      return false;
    }

    if (category.some(category => category.name === name && category.id !== id)) {
      setErrors({name: "Name already in use"});
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
      const {data} = await api.post('/category', {name});

      setCategory(category.concat(data.data));
  
      setName('');
      toggleFormState();
      setIsLoading(false);

      toast({
        title: "Categoria cadastrada.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      
      router.push('/admin/categorias');
    } catch(err) {
      console.log(err);
      setIsLoading(false);

    }

  }

  const handleSubmitUpdateCategory = async (e) => {
    e.preventDefault();

    if(!isValidFormData()) return;

    try {
      setIsLoading(true);

      await api.put(`/category/${id}`, {name});
      setCategory(category.map(category => category._id === id ? {name, id: id} : category));
  
      setName('');
      setId(null);
      toggleFormState();
      setIsLoading(false);

    } catch(err) {
      console.log(err);
      setIsLoading(false);

    }
  }

  const handleDeleteCategory = async (id) => {
    try {
      await api.delete(`/category/${id}`);
      setCategory(category.filter(category => category.id !== id));
    }catch(err) {
      console.log(err);
    }
  }

  const handleChangeName = (text) => {
    setName(text);
  }

  const handleShowUpdateCategoryForm = (category) => {
    setId(category.id);
    setName(category.name);
    setIsFormOpen(true);
  }

  const toggleFormState = () => {
    setIsFormOpen(!isFormOpen);
  }

  return (
    <Container maxW='container.lg'>
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
        <Button fontSize="sm" alignSelf="flex-end" colorScheme="blue" type="submit" isLoading={isLoading}>{ id ? 'Atualizar' : 'Cadastrar'}</Button>
      </VStack>
    )}

    <Table variant="simple" my="10">
      <Thead bgColor="blue.500">
        <Tr>
          <Th textColor="white">Name</Th>
          <Th textColor="white">Action</Th>
        </Tr>
      </Thead>
      <Tbody>
       {category ?
          category.map(category => (
          <Tr key={category.id}>
            <Td>{category.name}</Td>
            <Td>
              <Flex justifyContent="space-between">
                <Button size="sm" fontSize="smaller" colorScheme="yellow" mr="2" onClick={() => handleShowUpdateCategoryForm(category)}>Editar</Button>
                <Button size="sm" fontSize="smaller" colorScheme="red" onClick={() => handleDeleteCategory(category.id)}>Remover</Button>
              </Flex>
            </Td>
          </Tr>
        ))
        :
        
        <p>Error</p>

        } 
      </Tbody>

    </Table>
    </Box>
    </Container>
  )
}


export const getServerSideProps = async () => {
  try {
    const response = await api.get('/category');
    const category= await response.data;

    return {
      props: {category}, 
    };

  } catch (err) {
    console.log(err)
    return {
      props: {}
    }
  }
}