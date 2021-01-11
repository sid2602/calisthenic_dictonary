import { GetServerSideProps } from "next";
import { userIsLogged } from "services/auth";
import { User, Jwt } from "types/user";
import { setUser } from "data/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Home = ({ user, jwt }: User & Jwt) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const copyOfUser = {
      user: user,
    } as User;

    dispatch(setUser(copyOfUser));
  }, []);

  return <div>Hello</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user, jwt }: any = await userIsLogged(context);

  return {
    props: {
      user,
      jwt,
    },
  };
};

export default Home;
