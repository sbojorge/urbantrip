import { rest } from "msw";

const baseURL = "https://urbandrf-a23e17dc5cc1.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 5,
        username: "Chat0510",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 4,
        profile_image:
          "https://res.cloudinary.com/dvvr7cpfs/image/upload/v1/media/../default-profile.256x256_lpdl87",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req,res,ctx) => {
    return res(ctx.status(200));
}),
];
