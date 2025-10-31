import { Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Student from '../pages/Student';
import Students from '../pages/Students';
import Register from '../pages/Register';
import Photos from '../pages/Photos';
import EditUser from '../pages/EditUser';
import MyRoute from './myRoute';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Students} isClosed />
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
      <MyRoute exact path="/edit/" component={EditUser} isClosed />
      <MyRoute exact path="/register/" component={Register} isClosed={false} />
      <MyRoute exact path="/student/" component={Student} isClosed />
      <MyRoute exact path="/student/:id/edit" component={Student} isClosed />
      <MyRoute exact path="/photos/:id" component={Photos} isClosed />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
