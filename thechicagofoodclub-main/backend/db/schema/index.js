import { user, userRelations } from "./user.js";
import blackListToken from "./blacklisttoken.js";
import {
  membershipRequest,
  membershipRequestRelations,
} from "./membershipRequest.js";

const schema = {
  user,
  blackListToken,
  membershipRequest,
  membershipRequestRelations,
  userRelations,
};

export default schema;
