import { FC } from "react";

interface TitleWithSub {
  title: string;
  sub?: string;
}

const SectionTitle: FC<TitleWithSub> = ({ title, sub }: TitleWithSub) => (
  <div className="container mb-5">
    <div className="row">
      <div className="col-md-8 offset-md-2 animate-box text-center">
        { title ? <h2 style={{marginBottom: '15px'}} className="intro-heading">{ title }</h2> : "" }
        { sub ? <h6>{ sub }</h6> : "" }
      </div>
    </div>
  </div>
);

export default SectionTitle;
