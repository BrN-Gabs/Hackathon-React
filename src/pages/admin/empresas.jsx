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

export default function CompanyRegistration({ companies: fetchedCompanies }) {
  const toast = useToast();

  const [companies, setCompanies] = useState(fetchedCompanies);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const [errors, setErrors] = useState({name: null, whatsapp: null});

  const isValidFormData = () => {
    if(!name) {
      setErrors({name: 'Name is required'});
      return false;
    }

    if(!whatsapp) {
      setErrors({email: 'Whatsapp is required'});
      return false;
    }

    if(companies.some(company => company.whatsapp === whatsapp && company._id !== id)) {
      setErrors({whatsapp: "Whatsapp already in use"});
      return
    }

    setErrors({});
    return true;
  }

  const handleSubmitCreateCompany = async (e) => {
    e.preventDefault();

    if(!isValidFormData()) return;

    try {
      setIsLoading(true);
      const {data} = await api.post('/companies', {name, whatsapp});

      setCompanies(companies.concat(data.data));
  
      setName('');
      setWhatsapp('');
      toggleFormState();
      setIsLoading(false);

      toast({
        title: "Empresa cadastrada.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }catch(err) {
      console.log(err);
      setIsLoading(false);

    }

  }

  const handleSubmitUpdateCompany = async (e) => {
    e.preventDefault();

    if(!isValidFormData()) return;

    try {
      setIsLoading(true);

      await api.put(`/companies/${id}`, {name, whatsapp});
      setCompanies(companies.map(company => company._id === id ? {name, whatsapp, _id: id} : company));
  
      setName('');
      setWhatsapp('');
      setId(null);
      toggleFormState();
      setIsLoading(false);

    }catch(err) {
      console.log(err);
      setIsLoading(false);

    }
  }

  const handleDeleteCompany = async (_id) => {
    try {
      await api.delete(`/companies/${_id}`);
      setCompanies(companies.filter(company => company._id !== _id));
    }catch(err) {
      console.log(err);
    }
  }

  const handleChangeName = (text) => {
    setName(text);
  }

  const handleChangeWhatsapp = (text) => {
    setWhatsapp(text);
  }

  const handleShowUpdateCompanyForm = (company) => {
    setId(company._id);
    setName(company.name);
    setWhatsapp(company.whatsapp);
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
      <Text color="black" fontSize="2xl">Lista de Empresas</Text>
      
      <Button colorScheme="blue" onClick={toggleFormState}>{isFormOpen ? '-' : '+'}</Button>
    </Flex>

    { isFormOpen && (
      <VStack marginY="1rem" as="form" onSubmit={id ? handleSubmitUpdateCompany : handleSubmitCreateCompany}>
        <InputForm
          label="Nome"
          name="name"
          value={name} 
          onChange={e => handleChangeName(e.target.value)} 
          error={errors.name} 
        />

        <InputForm 
          label="Whatsapp" 
          name="whatsapp"
          type="number" 
          value={whatsapp} 
          onChange={e => handleChangeWhatsapp(e.target.value)}
          error={errors.whatsapp}
        />

        <Button fontSize="sm" alignSelf="flex-end" colorScheme="blue" type="submit" isLoading={isLoading}>{id? 'Atualizar' : 'Cadastrar'}</Button>
      </VStack>
    )}

    <Table variant="simple" my="10">
      <Thead bgColor="blue.500">
        <Tr>
          <Th textColor="white">Name</Th>
          <Th textColor="white">Whatsapp</Th>
          <Th textColor="white">Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {companies.map(company => (
          <Tr key={company.whatsapp}>
            <Td>{company.name}</Td>
            <Td>{company.whatsapp}</Td>
            <Td>
              <Flex justifyContent="space-between">
                <Button size="sm" fontSize="smaller" colorScheme="yellow" mr="2" onClick={() => handleShowUpdateCompanyForm(company)}>Editar</Button>
                <Button size="sm" fontSize="smaller" colorScheme="red" onClick={() => handleDeleteCompany(company._id)}>Remover</Button>
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>

    </Table>
    </Box>
  )
}


export const getServerSideProps = async () => {
  try {
    const { data } = await api.get('/companies');

    return {
      props: {
        companies: data.data
      }
    }
  } catch (err) {
    console.log(err)
    return {
      props: {}
    }
  }
}