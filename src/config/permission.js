import {
    Platform
} from 'react-native';
import {
    requestMultiple,
    request,
    PERMISSIONS,
    RESULTS,
} from 'react-native-permissions';
class Permission {
    static camera = {
        permission: Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA,
        name:"Camera",
        result:RESULTS.DENIED
    };
    static mic = {
        permission: Platform.OS === 'android' ? PERMISSIONS.ANDROID.RECORD_AUDIO : PERMISSIONS.IOS.MICROPHONE,
        name: Platform.OS === 'android' ? "Record Audio": "Microphone",
        result:RESULTS.DENIED
    };
    static storage_read = {
        permission: Platform.OS === 'android' ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE : PERMISSIONS.IOS.MEDIA_LIBRARY,
        name: Platform.OS === 'android' ? "Record Audio": "Microphone",
        result:RESULTS.DENIED
    };
    static storage_write = {
        permission: Platform.OS === 'android' ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE : PERMISSIONS.IOS.MEDIA_LIBRARY,
        name: Platform.OS === 'android' ? "Record Audio": "Microphone",
        result:RESULTS.DENIED
    };
    static location_wiu = {
        permission: Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        name: Platform.OS === 'android' ? "Record Audio": "Microphone",
        result:RESULTS.DENIED
    };
    static location_always = {
        permission: Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION : PERMISSIONS.IOS.LOCATION_ALWAYS,
        name: Platform.OS === 'android' ? "Record Audio": "Microphone",
        result:RESULTS.DENIED
    };

    static requestMultiplePermission (data)
    {
        return new Promise((sol,rej)=>{
            try {

                if (Array.isArray(data) && data.length>0)
                {
                    requestMultiple(data).then((result)=>{
                        console.log(result);
                        return sol(result)
                    }).catch((err)=> rej(err))
                }
                else {
                    return rej({error:"Permission not defined"})
                }

            }catch (e) {
                return rej(e)
            }
        })


    }
    static requestPermission (data)
    {
        return new Promise((sol,rej)=>{
            try {
                if (data && data.permission)
                {
                    request(data.permission,data.rationale?data.rationale:null).then((result)=>{
                        // console.log(result);
                        return sol(result)
                    }).catch((err)=> rej(err))
                }
                else {
                    return rej({error:"Permission not defined"})
                }
            }catch (e) {
                return rej(e)
            }
        })


    }

}
export default Permission ;

