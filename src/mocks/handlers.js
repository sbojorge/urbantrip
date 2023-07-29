import { rest } from "msw";

const baseURL = "https://urbandrf-a23e17dc5cc1.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 9,
        username: "Gati",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 8,
        profile_image:
          "https://res.cloudinary.com/dvvr7cpfs/image/upload/v1/media/../default-user-circle.256x256_qkk4wi",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
