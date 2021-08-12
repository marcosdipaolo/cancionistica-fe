import { FC } from "react";

interface ServiceProps {
  iconClass: string;
  title: string;
  text: string;
  columns: string;
}

const Service: FC<ServiceProps> = ({ iconClass, title, text, columns }) => (
  <div className={`col-md-${columns} text-center animate-box`}>
    <div className="services">
      <div className="icon">
        <span>
          <i className={ iconClass } />
        </span>
      </div>
      <h3>{ title }</h3>
      <p>
        { text }
      </p>
    </div>
  </div>
);

export default Service;
