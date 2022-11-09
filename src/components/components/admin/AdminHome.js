import AdminHeader from "../../menu/AdminHeader";
import dash from "../../../assets/dash/b_g.jpeg";

const AdminHome = () => {
  return (
    <>
      <AdminHeader />
      <section
        className="jumbotron breadcumb no-bg h-vh  mb-20 mt-1"
        style={{
          backgroundImage: `url(${"./img/bg-shape-1.jpg"})`,
          width: "100%",
        }}
      >
        <div className="text-center" style={{ width: "100%" }}>
          <img src={dash} alt="map "></img>
        </div>
      </section>
    </>
  );
};
export default AdminHome;
