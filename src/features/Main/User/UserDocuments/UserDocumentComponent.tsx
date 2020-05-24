import * as React from 'react';
import {Text, View, Modal, TouchableOpacity, Picker} from 'react-native';
import  HeaderComponent  from '../../shared/Header';
import { Button as PaperButton, Colors, IconButton, TextInput as PaperInput} from 'react-native-paper';
import FilePickerManager from 'react-native-file-picker';
import { styles } from './UserDocumentStyles';
import { connect } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { addDocument, deleteDocument } from '../../../../redux/User/actions';
import { AnyAction } from 'redux';
import { UserDocument } from 'src/types/User';
import FileViewer from 'react-native-file-viewer';
import { ScrollView } from 'react-native-gesture-handler';

const documentList = [
    { label: 'Паспорт', value: 'Паспорт'},
    { label: 'Загран паспорт', value: 'Загран паспорт' },
    { label: 'Студенческий билети', value: 'Студенческий билети' },
    { label: 'Военный билети', value: 'Военный билети' },
    { label: 'Пенсионное удостоверение', value: 'Пенсионное удостоверение' },
    { label: 'Свидетельство о рождении', value: 'Свидетельство о рождении' },
    { label: 'Водительское удостоверение', value: 'Водительское удостоверение' },
    { label: 'Нотариальный документ', value: 'Нотариальный документ' },
    { label: 'Другой документ', value: 'Другой документ' }
]

const placeholder = {
    label: 'Выберите тип документа',
    value: null,
    color: Colors.black
  };

interface Props{
    navigation: any,
    userDocuments : Array<UserDocument> 
    addDocument : (document : UserDocument) => void,
    deleteDocument : (index : number ) => void
}

class UserDocumentComponent extends React.Component<Props>
{
    state={
        visibleModalScreen : false,
        documentPath : "",
        documentName : "",
        documentAdditionalInfo : "",
        selectedValuePicker: documentList[0].value
    }
    render()
    {
        return(
            <ScrollView>
                <HeaderComponent 
                    navigation={this.props.navigation} 
                />
                 {
                        this.props.userDocuments.map((document : UserDocument, index : number) => 
                        {
                            return(
                                    <View style={styles.documentContainer}>
                                        <TouchableOpacity onPress={()=>{
                                            if(document.path)
                                            {
                                                FileViewer.open(document.path)
                                            }
                                        }}>
                                            <Text>{document.documentType}</Text>
                                            <Text>{document.additionInfo}</Text>
                                        </TouchableOpacity>
                                        <IconButton 
                                            style={{position: "absolute", left: "85%"}}
                                            onPress={()=>{this.props.deleteDocument(index)}}
                                            icon="delete"
                                        ></IconButton>
                                    </View>                          
                            )
                        })
                    }
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.visibleModalScreen}
                >
                    <View style={{width: "80%", alignSelf: "center",top: "30%", borderColor: Colors.black, borderWidth: 1, backgroundColor : Colors.white, height: "50%", borderRadius: 5}}>
                        <View style={{marginTop: 15}}>
                            <View style={{flexDirection: "row"}}>
                                {
                                    this.state.documentPath !== "" ? 
                                    <Text style={styles.text}>{this.state.documentName}</Text>
                                    :
                                    <Text style={styles.text}>
                                        Путь к документу не выбран
                                    </Text>
                                }
                                <IconButton
                                    icon="folder-outline"
                                    size={35}
                                    onPress={()=>{
                                        FilePickerManager.showFilePicker(null,
                                            (response: { didCancel: any; error: any; uri: any; }) => {
                                                console.log('Response = ', response);
                                            
                                                if (response.didCancel) {
                                                console.log('User cancelled file picker');
                                                }
                                                else if (response.error) {
                                                console.log('FilePickerManager Error: ', response.error);
                                                }
                                                else {
                                                    this.setState({documentPath: response.uri});
                                                    this.setState({documentName : response.fileName})
                                                }
                                            })
                                    }}
                                    color={Colors.purple700}
                                />
                            </View>
                            
                            <Picker
                                style={{width: "80%", alignSelf: "center"}}
                                selectedValue={this.state.selectedValuePicker}
                                onValueChange={(itemValue, itemIndex) => this.setState({selectedValuePicker : itemValue}) }
                            >
                                {
                                    documentList.map(
                                        (item : {value: string, label: string}) => {
                                            return(
                                                <Picker.Item label={item.label} value={item.value} />
                                            )
                                    })
                                }
                            </Picker>

                            <PaperInput 
                                placeholder="Введите доп. информацию"
                                style={{width: "80%", alignSelf: "center"}}
                                onChangeText={(text)=>{this.setState({documentAdditionalInfo : text})}}
                            />

                            <View style={{flexDirection: "row", alignSelf: "center"}}>
                                <PaperButton 
                                    onPress={()=>{this.setState({visibleModalScreen : false})}}
                                >Закрыть</PaperButton>
                                <PaperButton
                                    onPress={()=>{
                                        this.props.addDocument({path : this.state.documentPath, documentType : this.state.selectedValuePicker, additionInfo : this.state.documentAdditionalInfo})
                                        this.setState({visibleModalScreen : false})
                                        this.setState({documentAdditionalInfo : "", documentName : "",  documentPath : "", documentType : ""})
                                    }}
                                    disabled={this.state.documentPath === "" || this.state.selectedValuePicker===""}
                                >Сохранить
                                </PaperButton>
                            </View>
                        </View>
                    </View>
                </Modal>
                <PaperButton 
                    onPress={()=>{this.setState({visibleModalScreen : true})}}
                >
                    Добавить
                </PaperButton>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    userDocuments: state.user.documentList
})
const mapDispatchToProps = (dispatch: React.Dispatch<AnyAction>) => ({
    addDocument: (document: UserDocument) => dispatch(addDocument({document : document})),
    deleteDocument: (index: number) => dispatch(deleteDocument({index : index}))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserDocumentComponent);