import { Drawer } from "expo-router/drawer";
import { Header, SideDrawer } from "#components";

export default function DrawerLayout() {
	return (
		<Drawer
			screenOptions={({ navigation }) => ({
				drawerStyle: {
					width: 320,
					backgroundColor: "#151916",
				},
				header: () => <Header navigation={navigation} />,
			})}
			drawerContent={SideDrawer}
		/>
	);
}
