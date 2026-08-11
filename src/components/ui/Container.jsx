export default function Container({
  children,
  className = "",
  as: Tag = "div",
}) {
  return <Tag className={`site-container ${className}`}>{children}</Tag>;
}
