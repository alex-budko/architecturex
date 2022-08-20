import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { verify } from "../auth-reducers/AuthReducers";
import { Button, Center, Divider, Heading, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

function Activate() {
  const { uid, token } = useParams();
  const dispatch = useDispatch;
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false)

  if (verified) {
    navigate('/login', { replace: true })
  }

  return (
    <Center>
      <VStack
        rounded={"3xl"}
        shadow="dark-lg"
        minH={'280px'}
        maxW={"600px"}
        mt="30vh"
        p="10"
        minW="400px"
        bgColor={"gray.900"}
      >
        <Center>
          <Heading>Welcome To Our Website!</Heading>
        </Center>
        <Divider />
        <Center>
          <Text fontSize={'large'}><i>Now, go ahead and let your creativity shine!</i></Text>
        </Center>
        <Button
          onClick={() => {
            verify(dispatch, uid, token).then(() => {
              setVerified(true)
            });
          }}
          size="md"
          style={{
            marginTop: '15px'
          }}
          _hover={{
            bgColor: 'orange.400'
          }}
          type="submit"
          bgColor={'orange.600'}
        >
          Confirm
        </Button>
      </VStack>
    </Center>
  );
}

export default Activate;
