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
  Input,
  Container,
  useToast
} from "@chakra-ui/react"
import {InputForm} from '../../components/main';
import api from "../../services/api";
import InputMask from 'react-input-mask';


export default function CompanyRegistration({ company: fetchedCompany }) {
  const toast = useToast();

  const [company, setCompany] = useState(fetchedCompany);
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
      setErrors({whatsapp: 'Whatsapp is required'});
      return false;
    }

    if(company.some(company => company.whatsapp === whatsapp && company.id !== id)) {
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
      const {data} = await api.post('/company', {
        name: name, 
        whatsapp: whatsapp.replace(/\D+/g, '')
      });

      setCompany(company.concat(data.data));
  
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

      await api.put(`/company/${id}`, {
        name: name, 
        whatsapp: whatsapp.replace(/\D+/g, '')
      });
      setCompany(company.map(company => company.id === id ? {name, whatsapp, id: id} : company));
  
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

  const handleDeleteCompany = async (id) => {
    try {
      await api.delete(`/company/${id}`);
      setCompany(company.filter(company => company.id !== id));
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
    setId(company.id);
    setName(company.name);
    setWhatsapp(company.whatsapp);
    setIsFormOpen(true);
  }

  const toggleFormState = () => {
    setIsFormOpen(!isFormOpen);
  }

  return (
    <Container maxW='container.lg'>
    <Box margin="4">

    <Flex color="white" justifyContent="space-between">
      <Text color="black" fontSize="2xl">Lista de Empresas</Text>
      
      <Button bgColor="#820b89" onClick={toggleFormState}><b>{isFormOpen ? '-' : '+'}</b></Button>
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
          as={InputMask} mask="(99) 9 9999-9999" maskChar={null}
          type="text"
          label="Whatsapp" 
          name="whatsapp"
          value={whatsapp} 
          onChange={e => handleChangeWhatsapp(e.target.value)}
          error={errors.whatsapp}
        />
  
        <Button fontSize="sm" alignSelf="flex-end" bgColor="#00febf" type="submit" isLoading={isLoading}>{id ? 'Atualizar' : 'Cadastrar'}</Button>
      </VStack>
    )}

    <Table variant="simple" my="10">
      <Thead bgColor="#820b89">
        <Tr>
          <Th textColor="white">Name</Th>
          <Th textColor="white">Whatsapp</Th>
          <Th textColor="white">Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {company.map(company => (
          <Tr key={company.whatsapp}>
            <Td>{company.name}</Td>
            <Td>
              {
              <Input
                as={InputMask} mask="(99) 9 9999-9999" maskChar={null}
                value={company.whatsapp} 
                isDisabled
                style={{opacity: 1}}
              />
              }
            </Td>
            <Td>
              <Flex justifyContent="space-between">
                <Button size="sm" fontSize="smaller" colorScheme="yellow" mr="2" onClick={() => handleShowUpdateCompanyForm(company)}>Editar</Button>
                <Button size="sm" fontSize="smaller" colorScheme="red" onClick={() => handleDeleteCompany(company.id)}>Remover</Button>
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
    const response = await api.get('/company');
    const company= await response.data;

    return {
      props: {company}, 
    };

  } catch (err) {
    console.log(err)
    return {
      props: {}
    }
  }
}