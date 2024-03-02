import { Link } from "react-router-dom";
import { size, map } from "lodash";

const Image = (cell: any) => {
  return (
    <>
      <img className="avatar-sm rounded-circle me-2" src={cell.value} alt="" />
      <a className="text-body fw-medium" href="/user-list">
        {cell.name}
      </a>
    </>
  );
};
const Tags = (cell: any) => {
  return (
    <>
      {map(cell.value, (tag, index) => (
        <Link
          to="#"
          className="badge badge-soft-primary font-size-11 m-1"
          key={"_skill_" + cell.value + index}
        >
          {tag}
        </Link>
      ))}
      {size(cell.value) > 2 && (
        <Link
          to="#"
          className="badge badge-soft-primary font-size-11 m-1"
          key={"_skill_" + cell.value}
        >
          {size(cell.value) - 1} + more
        </Link>
      )}
    </>
  );
};
export { Image,  Tags  };
