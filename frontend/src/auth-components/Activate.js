import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { verify } from "../auth-reducers/AuthReducers";
import { Button, Center, Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";

function Activate() {
  const { uid, token } = useParams();
  const dispatch = useDispatch;
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false)

  if (verified) {
    navigate('/login')
  }

  return (
    <Center>
      <VStack
        rounded={"3xl"}
        shadow="dark-lg"
        minH={'180px'}
        maxW={"600px"}
        mt="30vh"
        p="10"
        minW="300px"
        bgColor={"gray.900"}
      >
        <Center>
          <Heading>Welcome!</Heading>
        </Center>
        <Button
          position={'absolute'}
          bottom='4'
          onClick={() => {
            verify(dispatch, uid, token).then(() => {
              setVerified(true)
            });
          }}
          size="md"
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
