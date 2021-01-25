import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';



const reactotron = Reactotron.configure({ name: 'Courses', host: '192.168.1.5', port: 9090 })
    .use(reactotronRedux()).useReactNative()
    .connect();







export default reactotron







