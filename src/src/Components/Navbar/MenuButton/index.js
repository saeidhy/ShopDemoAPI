// src/Components/Navbar/MenuButton/index.js
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const MenuButton = () => {
  return (
    <div className="text-center">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className={styles.menuButton}>
          <UserCircleIcon className={styles.userCircleIcon} aria-hidden="true" />
          <span>Login or Sign Up</span>
          <ChevronDownIcon className={styles.chevronDownIcon} aria-hidden="true" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/signin"
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Login
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/signup"
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Sign Up
                  </Link>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default MenuButton;
