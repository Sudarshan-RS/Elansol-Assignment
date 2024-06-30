import { NavLink } from "react-router-dom";

export const Error = () => {
  return (
    <>
      <section id="error-page">
        <div className="content">
          <h2 className="header">404</h2>
          <h4>Sorry! Page not found</h4>
          <p>
            The page you are looking for might have been removed, had its name
            changed, is temporarily unavailable or doesn&#39;t exist. Please try
            the following: 
            If you believe there&#39;s an issue, feel free to report it, and we&#39;ll
            look into it.
          </p>
          <div className="btns">
            <NavLink to="/"><button className="err-btn">return login</button></NavLink>
          </div>
        </div>
      </section>
    </>
  );
};
