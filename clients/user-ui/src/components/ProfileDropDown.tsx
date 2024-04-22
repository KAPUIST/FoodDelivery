'use client';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import AuthScreen from '../screen/AuthScreen';
type Props = {};

const ProfileDropDown = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  return (
    <div className="flex items-center gap-4">
      {signedIn ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar as="button" className="transition-transform" />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="faded">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">계정 이메일</p>
              <p className="font-semibold">admin@demo.com</p>
            </DropdownItem>
            <DropdownItem key="settings">프로필</DropdownItem>
            <DropdownItem key="all_orders">주문</DropdownItem>
            <DropdownItem key="team_setting">판매자 등록</DropdownItem>
            <DropdownItem key="logout" color="danger">
              로그아웃
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <CgProfile
          className="text-3xl cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      )}
      {open && <AuthScreen />}
    </div>
  );
};

export default ProfileDropDown;
