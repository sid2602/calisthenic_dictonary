import { GetServerSideProps } from "next";
import { userIsLogged } from "services/auth";
import User from "types/user";

const Home = ({ user }: User) => {
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user }: any = await userIsLogged(context);

  return {
    props: {
      user,
    },
  };
};

export default Home;
