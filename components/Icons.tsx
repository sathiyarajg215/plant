import React from 'react';

interface IconProps {
  className?: string;
}

export const LeafIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 4 13V8a7.999 7.999 0 0 1 10.27-7.58C18.69 2.34 22 8.24 22 13a7 7 0 0 1-11 7Z"/><path d="M11 20v-9"/><path d="M4.5 9.5c.9-.9 2.1-1.5 3.5-1.5"/></svg>
);

export const CartIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
);

export const BackIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);

export const SunIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
);

export const WaterIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

export const CreditCardIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
);

export const UserIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export const MailIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

export const MapPinIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

export const LogOutIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
);

export const KeyIcon: React.FC<IconProps> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
);

export const UserCircleIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
);

export const ReceiptIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h6"/><path d="M12 18.08V12"/></svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

export const StarIcon: React.FC<IconProps & { filled?: boolean }> = ({ className, filled }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

export const MessageSquareIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);

export const HelpCircleIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
);

export const TruckIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/><circle cx="7.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/></svg>
);

export const GoogleIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
);

export const FacebookIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
);

export const GooglePayLogo: React.FC<IconProps> = ({ className }) => (
    <svg className={className} height="26" viewBox="0 0 64 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.52 10.856L6.544 10.328C7.168 10.016 7.6 9.488 7.6 8.8V4.664C7.6 3.008 6.248 1.6 4.648 1.6H3.048C2.128 1.6 1.328 2.352 1.328 3.248V9.2C1.328 10.096 2.128 10.856 3.048 10.856H5.52Z" fill="#4285F4"/>
        <path d="M22.048 3.248C22.048 2.352 21.248 1.6 20.328 1.6H18.728C17.128 1.6 15.776 3.008 15.776 4.664V8.8C15.776 9.488 16.208 10.016 16.832 10.328L17.856 10.856H20.336C21.256 10.856 22.056 10.096 22.056 9.2L22.048 3.248Z" fill="#EA4335"/>
        <path d="M36.104 1.6H33.128C32.208 1.6 31.408 2.352 31.408 3.248V9.2C31.408 10.096 32.208 10.856 33.128 10.856H36.104C37.704 10.856 39.056 9.448 39.056 7.792V4.664C39.056 3.008 37.704 1.6 36.104 1.6Z" fill="#FBBC04"/>
        <path d="M13.6 10.856L14.624 10.328C15.248 10.016 15.68 9.488 15.68 8.8V4.664C15.68 3.008 14.328 1.6 12.728 1.6H11.128C10.208 1.6 9.408 2.352 9.408 3.248V9.2C9.408 10.096 10.208 10.856 11.128 10.856H13.6Z" fill="#34A853"/>
        <path d="M12.915 24.4C11.515 24.4 10.455 23.36 10.455 22.02V13.88H8.595V22.14C8.595 24.38 10.455 26 12.775 26C14.155 26 15.215 25.32 15.895 24.46L14.735 23.16C14.275 23.94 13.595 24.4 12.915 24.4Z" fill="#5F6368"/>
        <path d="M21.033 24.78C22.093 24.78 22.813 24.18 23.153 23.5L24.873 23.94C24.313 25.2 23.013 26 21.153 26C18.773 26 17.033 24.3 17.033 22C17.033 19.7 18.713 18 21.073 18C22.953 18 24.233 18.98 24.693 20.24L22.993 20.84C22.753 20.16 22.113 19.62 21.173 19.62C19.953 19.62 19.093 20.64 19.093 22C19.093 23.36 19.933 24.36 21.033 24.78Z" fill="#5F6368"/>
        <path d="M27.221 25.82V18.18H29.141V19.8H29.221C29.641 18.8 30.741 18 31.901 18C32.221 18 32.501 18.06 32.741 18.12V19.98C32.321 19.86 31.941 19.8 31.521 19.8C30.341 19.8 29.501 20.6 29.141 21.3V25.82H27.221Z" fill="#5F6368"/>
        <path d="M37.94 25.82H36.02L34.18 21.36H34.1V25.82H32.18V18.18H34.46C35.8 18.18 36.88 19.02 36.88 20.36C36.88 21.3 36.38 21.94 35.68 22.3L37.94 25.82ZM34.1 20.08V20.06L35.94 20.06C36.06 20.06 36.2 20.1 36.2 20.24C36.2 20.44 36.08 20.58 35.84 20.58H34.1V20.08Z" fill="#5F6368"/>
        <path d="M43.799 26C45.899 26 47.019 24.96 47.019 23.24V23.08C46.179 24.1 45.039 24.66 43.799 24.66C42.019 24.66 40.759 23.38 40.759 21.98C40.759 20.44 42.039 19.34 43.679 19.34C44.839 19.34 45.719 19.84 46.339 20.58L46.859 20.14L47.799 18.36L45.919 18.18C45.219 18.66 44.419 18 43.079 18C40.699 18 38.779 19.82 38.779 22.02C38.779 24.32 40.759 26 43.799 26Z" fill="#5F6368"/>
        <path d="M53.131 25.82H51.451L48.811 18.18H50.871L52.271 22.56L53.691 18.18H55.731L53.131 25.82Z" fill="#5F6368"/>
        <path d="M57.653 18.18H59.573V25.82H57.653V18.18Z" fill="#5F6368"/>
        <path d="M63.535 22C63.535 24.26 61.755 26 59.575 26C57.395 26 55.615 24.26 55.615 22C55.615 19.74 57.395 18 59.575 18C61.755 18 63.535 19.74 63.535 22ZM57.535 22C57.535 23.22 58.415 24.18 59.575 24.18C60.735 24.18 61.615 23.22 61.615 22C61.615 20.78 60.735 19.82 59.575 19.82C58.415 19.82 57.535 20.78 57.535 22Z" fill="#5F6368"/>
    </svg>
);

export const PhonePeLogo: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
        <path d="M43.6,35.1V13h5.9c3,0,5.4,0.4,7.3,1.2c1.9,0.8,3.4,2,4.6,3.6s1.7,3.5,1.7,5.6c0,2.3-0.6,4.3-1.8,6c-1.2,1.7-2.8,2.9-4.8,3.6c-2,0.7-4.4,1.1-7.2,1.1H43.6z M48.2,30.6h2.7c3.1,0,5.4-0.4,6.9-1.2s2.3-2.1,2.3-3.8c0-1.8-0.8-3.1-2.3-3.9c-1.5-0.8-3.8-1.2-6.9-1.2h-2.7V30.6z" fill="#5A3493"/>
        <path d="M72.2,35.1V13h4.6v22.1H72.2z" fill="#5A3493"/>
        <path d="M80.6,35.1V13h13.2v4.5H85.2v4.7h7.6v4.4h-7.6v8.5H80.6z" fill="#5A3493"/>
        <path d="M103,35.1l-6.2-9.7c-0.6-1-1-1.8-1.2-2.4c-0.2,0.7-0.5,1.5-1,2.5l-6,9.6H84l10.2-15L84.2,5.1h4.9l5.1,8.3c0.7,1.1,1.1,2,1.3,2.7c0.2-0.7,0.5-1.5,1-2.6l5.3-8.4h4.7L106.1,20l10,15.1H103z" fill="#5A3493"/>
        <path d="M121.7,35.1V13h13.2v4.5h-8.6v4.7h7.6v4.4h-7.6v8.5H121.7z" fill="#5A3493"/>
        <path d="M176.6,18.3c0-2.3-0.7-4.2-2-5.5c-1.3-1.3-3.1-2-5.3-2c-2.8,0-5,0.9-6.6,2.8s-2.4,4.4-2.4,7.5c0,3,0.8,5.5,2.3,7.4c1.6,1.9,3.8,2.9,6.7,2.9c2.1,0,3.9-0.6,5.2-1.8c1.3-1.2,2.1-2.9,2.1-5.1H172c0,1.2-0.3,2.1-0.9,2.7c-0.6,0.6-1.5,0.9-2.5,0.9c-1.6,0-2.9-0.6-3.7-1.9c-0.8-1.2-1.3-3-1.3-5.2c0-2.2,0.4-3.9,1.2-5.1c0.8-1.2,2-1.8,3.7-1.8c1,0,1.8,0.3,2.4,0.8s0.9,1.4,0.9,2.6H176.6z" fill="#5A3493"/>
        <path d="M37.9,19.2c-2.4-2.8-5.8-4.3-10-4.3c-4.2,0-7.7,1.5-10,4.4c-2.3,2.9-3.5,6.7-3.5,11.3c0,4.6,1.2,8.4,3.5,11.3c2.3,2.9,5.8,4.3,10,4.3c4.2,0,7.7-1.4,10-4.3c2.3-2.9,3.5-6.7,3.5-11.3C41.4,25.9,40.2,22,37.9,19.2z M27.9,38.5c-3,0-5.3-1.8-6.1-5.4h12.2C33.2,36.7,30.9,38.5,27.9,38.5z M21.8,27.7c0.8-3.6,3.1-5.4,6.1-5.4c3,0,5.3,1.8,6.1,5.4H21.8z" fill="#5A3493"/>
    </svg>
);