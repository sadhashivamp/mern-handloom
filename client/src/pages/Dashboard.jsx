import Header from "../components/Header";
import OwnerCard from "../components/OwnerCard";
import employerOwners from "../utils/employerOwners.json";
import machineProviders from "../utils/machineProviders.json";
import artisanOwners from "../utils/artisanOwners.json";
import MainSlider from "../components/Slider";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="m-10">
        <MainSlider />
      </div>
      <div className="m-10">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Owners lists</h2>
        </div>
        <h2 className="text-xl font-bold text-white mb-4">
          Employer Opportunities
        </h2>
        <OwnerCard owners={employerOwners} />

        <h2 className="text-xl font-bold text-white mb-4 mt-8">
          Machine Provider Opportunities
        </h2>
        <OwnerCard owners={machineProviders} />

        <h2 className="text-xl font-bold text-white mb-4 mt-8">
          Artisan Opportunities
        </h2>
        <OwnerCard owners={artisanOwners} />
      </div>
    </div>
  );
};

export default Dashboard;
