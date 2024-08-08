import {MainWindow} from "./windows/main.window";
import {useProvide} from "./utils/hooks/provide.hook";
import {FileService} from "./utils/services/file.service";

try {
    useProvide([FileService]).resolve(MainWindow)
} catch (e) {

}
