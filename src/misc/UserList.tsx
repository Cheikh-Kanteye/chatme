import { faker } from "@faker-js/faker";
import { User } from "@utils/type";

function createRandomUser(): User {
  return {
    _id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    sex: faker.person.sexType(),
    online: Math.random() < 0.5,
  };
}
const numberOfUsers = 30;

const UserList: User[] = Array.from(
  { length: numberOfUsers },
  createRandomUser
);
export const OnlineUsers: User[] = UserList.filter((user) => user.online).map(
  (user) => user
);

export default UserList;
