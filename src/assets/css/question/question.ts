import { StyleSheet } from "react-native";
import { Colors, Fonts, Weight } from "../global/font";

const questionStyles = StyleSheet.create({
    QuestionTitleWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    QuestionTitleLeft: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
    },
    QuestionTitleRight: {
        width: '10%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    QuestionTitle: {
        ...Fonts.Android.normal,
        fontSize: 16,
        paddingHorizontal: 10,
        ...Colors.Black,
        ...Weight.Default,
    },
    QuestionMark: {
        fontFamily: 'Noto Sans',
        fontSize: 18,
        color: '#2262AD',
        ...Weight.Bold,
    },
    ContentTextWrap: {
        width: '92%',
        alignSelf: 'center',
        backgroundColor: '#E9E9E9',
        marginTop: 0.5,
    },
    ContentText: {
        width: '100%',
        fontFamily: 'Noto Sans',
        paddingVertical: 17,
        fontSize: 15,
        ...Weight.Default,
        ...Colors.Black,
        // flexShrink: 1,
    },
});

export { questionStyles };