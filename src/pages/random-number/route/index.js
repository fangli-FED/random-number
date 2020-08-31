import Login from '../containers/Login';
import UserCenter from '../containers/UserCenter';
import ManagePage from '../containers/Manage';
import ManageList from '../containers/ManageList';
import Sheet from '../containers/Sheet';
import CreateProject from '../containers/CreateProject';
import ManageDetail from '../containers/ManageDetail';
import Lottery from '../containers/Lottery';
import LotteryDesc from '../containers/LotteryDesc';
import LottleStart from '../containers/LottleStart';
import LottleResult from '../containers/LottleResult';

export const ROUTER_LIST = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/lottlery/desc/:id',
    component: LotteryDesc
  },
  {
    path: '/lottlery/result/:id',
    component: LottleResult
  },
  {
    path: '/lottlery/start/:id',
    component: LottleStart
  },
  {
    path: '/lottlery/:id',
    component: Lottery
  },
  // {
  //   path: '/homepage',
  //   component: HomePage,
  // },
  // TODO: 删除
  {
    path: '/test',
    component: Sheet,
  },
  {
    path: '/manage/usercenter',
    component: UserCenter,
  },
  {
    path: '/manage/detail/:id',
    component: ManageDetail,
  },
  {
    path: '/manage/create',
    component: CreateProject,
  },
  {
    path: '/manage/list',
    component: ManageList,
  },
  {
    path: '/manage',
    component: ManagePage,
  },
];

// export const renderRouter = (data) => (
//   <>
//     {
//       ROUTER_LIST.map(item => {
//         if (item.children) {
//           renderRouter(item.children);
//         } else {
//           return <Route path={item.path}
//         }
//       })
//     }
//   </>
// );
