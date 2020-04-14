export class Dto {
  composeUser(user) {
    const { _id: id, name, email } = user;

    return {
      user: {
        id,
        name,
        email,
      },
    };
  }
}

export const dto = new Dto();
