import { LOADER } from '../Constant/constants';

export default function loaderData(data) {
  return {
    type: LOADER,
    loaderData: data,
  };
}
