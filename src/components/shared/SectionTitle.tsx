import { FC } from "react";

interface TitleWithSub {
  title: string;
  sub?: string;
}

const SectionTitle: FC<TitleWithSub> = ({ title, sub }: TitleWithSub) => (
  <div className="container">
    <div className="row">
      <div className="col-md-8 offset-md-2 animate-box text-center">
        {title ? <h2 className="intro-heading">{title}</h2> : ""}
        {sub ? <p>{sub}</p> : ""}
      </div>
    </div>
  </div>
);

export default SectionTitle;
