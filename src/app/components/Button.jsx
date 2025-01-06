export const SectionButton = ({ id, children }) => {
  return (
    <a
      className={`px-4 py-2 text-white border border-white rounded-lg cursor-pointer`}
      href={id}
    >
      {children}
    </a>
  );
};
