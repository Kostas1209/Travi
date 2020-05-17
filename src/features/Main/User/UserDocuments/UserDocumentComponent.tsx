import * as React from 'react';
import {Text, View, Modal, TouchableOpacity} from 'react-native';
import  HeaderComponent  from '../../shared/Header';
import { Button as PaperButton, Colors, IconButton, TextInput as PaperInput} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
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
    { label: 'Паспорт', value: 'Паспорт', color: Colors.black },
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
    value: null
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
        documentType : "",
        documentName : "",
        documentAdditionalInfo : ""
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
                    <View style={{alignSelf: "center",top: "30%", borderColor: Colors.black, borderWidth: 1, backgroundColor : Colors.white, height: "50%", borderRadius: 5}}>
                        <View style={{marginTop: 15}}>
                            <Text style={{alignSelf: "center"}}>Посадочный билет туда</Text>
                            <View style={[{flexDirection: "row"},styles.container]}>
                                {
                                    this.state.documentPath !== "" ? 
                                    <Text>{this.state.documentName}</Text>
                                    :
                                    <Text>
                                        Не выбрано
                                    </Text>
                                }
                                <IconButton
                                    icon="folder-outline"
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
                                    style={{position:"absolute", top: "0%", left:"70%"}}
                                />
                            </View>
                            
                            <RNPickerSelect
                                onValueChange={(value) => this.setState({documentType : value})}
                                items={documentList}
                                placeholder={placeholder}
                            />

                            <Text>Введите дополнительную информацию</Text>
                            <PaperInput 
                                style={{width: "80%", alignSelf: "center"}}
                                onChangeText={(text)=>{this.setState({documentAdditionalInfo : text})}}
                            />

                            <View style={{flexDirection: "row", alignSelf: "center"}}>
                                <PaperButton 
                                    onPress={()=>{this.setState({visibleModalScreen : false})}}
                                >Закрыть</PaperButton>
                                <PaperButton
                                    onPress={()=>{
                                        this.props.addDocument({path : this.state.documentPath, documentType : this.state.documentType, additionInfo : this.state.documentAdditionalInfo})
                                        this.setState({visibleModalScreen : false})
                                        this.setState({documentAdditionalInfo : "", documentName : "",  documentPath : "", documentType : ""})
                                    }}
                                >Добавить
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