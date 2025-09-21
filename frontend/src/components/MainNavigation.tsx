"use client";

import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  PencilSquareIcon, 
  BellIcon, 
  UserIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  PencilSquareIcon as PencilSquareIconSolid,
  BellIcon as BellIconSolid,
} from '@heroicons/react/24/solid';

export function MainNavigation() {
  const router = useRouter();
  const pathname = router.pathname;

  const handleLogout = () => {
    router.push('/login');
  };

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: HomeIcon,
      activeIcon: HomeIconSolid
    },
    { 
      name: 'Schedule', 
      href: '/documents', 
      icon: DocumentTextIcon,
      activeIcon: DocumentTextIconSolid
    },
    { 
      name: 'Notes', 
      href: '/notes', 
      icon: PencilSquareIcon,
      activeIcon: PencilSquareIconSolid
    },
    { 
      name: 'Notifications', 
      href: '/notifications', 
      icon: BellIcon,
      activeIcon: BellIconSolid,
      badge: 3
    },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <h1 className="text-xl font-semibold text-gray-900">Research Hub</h1>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const Icon = isActive ? item.activeIcon : item.icon;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                      isActive
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.name}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-2">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <UserIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="space-y-1 pb-3 pt-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = isActive ? item.activeIcon : item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                  isActive
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center">
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                  {item.badge && (
                    <Badge variant="secondary" className="ml-2">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}