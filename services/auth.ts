import { setCookie, parseCookies, destroyCookie } from "nookies";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { User } from "types/user";

export const setUser = (jwt: string) => {
  setCookie(null, "jwt", jwt, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

export const logOutUser = () => {
  destroyCookie(null, "jwt");
  window.location.replace("login");
};

export const userIsLogged = async (context: GetServerSidePropsContext) => {
  const { res } = context;

  try {
    const jwt = parseCookies(context).jwt;
    if (jwt !== undefined) {
      const checkSrc = `${process.env.API_URL}users/me`;

      const { data } = await axios.get(checkSrc, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return {
        user: data as User,
      };
    }

    if (jwt === undefined && res !== undefined) {
      res.writeHead(307, { Location: "/login" });
      res.end();

      return {
        user: null,
      };
    }
  } catch (error) {
    res.writeHead(307, { Location: "/login" });
    res.end();

    return {
      user: null,
    };
  }
};
