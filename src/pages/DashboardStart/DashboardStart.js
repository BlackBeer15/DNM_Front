import NavigationPanel from "../../components/NavigationPanel/NavigationPanel";
import ContainerMap from "../../components/ContainerMap/ContainerMap";

const DashboardStart = () => {
    return(
        <div className="wrapper-workspace ">
            <NavigationPanel />
            <ContainerMap />
        </div>
    );
}

export default DashboardStart;