import { ToolbarProps } from './interface';

export function Toolbar(props: Readonly<ToolbarProps>) {
  return <div>{props.children}</div>;
}
