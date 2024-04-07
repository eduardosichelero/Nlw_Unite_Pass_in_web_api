import { ComponentProps } from "react";

interface NavLinkProps extends ComponentProps<'a'> {
  children: string
}

export function NavLink(props: NavLinkProps) {
  return (
     <a {...props} className='flex items-center gap-5 py-2'>
        {props.children}
     </a>
  );
 }
 