import { createStore } from 'easy-peasy';
import GlobalModels from './models'

const {
  example,
  authModel,
  uiModel,
  registerModel,
  userModel,
  projectModel,
  enterpriseModel,
  agencyModel,
} = GlobalModels

const storeModel = {
  products: example,
  auth: authModel,
  register: registerModel,
  user: userModel,
  project: projectModel,
  enterprise: enterpriseModel,
  agency: agencyModel,
  ui: uiModel
};

const store = createStore(storeModel);

export default store