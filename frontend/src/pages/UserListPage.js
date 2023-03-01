import React from 'react';
import AdminHeader from '../components/AdminHeader/AdminHeader';
import UserList from '../components/UserList/UserList'

function UserListPage() {
  return (
    <React.Fragment>
      <AdminHeader />
      <UserList />
    </React.Fragment>
  )
}

export default UserListPage