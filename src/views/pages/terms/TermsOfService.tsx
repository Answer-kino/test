import {useEffect} from 'react';
import {View, Text, ScrollView, BackHandler} from 'react-native';
import TopNav from '../../../components/topNav/TopNav';
import TermsOfServiceStyles from '../../../assets/css/termsOfService/termsOfService';
import {Font} from '../../../assets/css/global/newFont';
import {MarginTop} from '../../../assets/css/global/margin';
import {globalStyles} from '../../../assets/css/global/styleSheet';
import {TouchableOpacity} from 'react-native';

const TermsOfService = ({navigation}: any) => {
  useEffect(() => {
    const backAction = () => {
      navigation.pop();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View>
      <View style={TermsOfServiceStyles.Full}>
        <ScrollView>
          <TopNav navigation={navigation} title="이용약관"></TopNav>
          <View style={TermsOfServiceStyles.MainContainer}>
            <View style={TermsOfServiceStyles.ContentWrap}>
              <Text style={Font.TermsOfServiceTitle}>제1조(목적)</Text>

              <Text style={Font.TermsOfServiceContent}>
                본 약관은 주식회사 에이치오토(이하 "회사"라 함)이 제공하는
                에이치오토 서비스 이용 및 제공에 관한 제반사항을 규정함을 그
                목적으로 합니다.
              </Text>

              <View style={MarginTop(20)}>
                <Text style={Font.TermsOfServiceTitle}>
                  제 2조 (용어의 정의)
                </Text>
                <View style={TermsOfServiceStyles.BodyContent1Wrap}>
                  <Text style={Font.TermsOfServiceContent}>
                    ① MYCARNFT란 이용자가 서비스를 이용하기 위하여 접속하는
                    스마트폰 애플리케이션을 말합니다.
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    ② ‘이용자’라 함은 사이트에 접속하여 서비스를 이용하는 회원
                    및 비회원을 말합니다.
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    ③ ‘회원’이라 함은 사이트의 다양한 서비스를 지속적으로
                    이용하기 위하여 인증서 등록절차를 거쳐 회원으로 가입한 자를
                    말합니다.
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    ④ ‘회원 탈퇴’라 함은 회원의 의사에 따라 인증서 등록취소
                    절차를 거쳐 회원으로서의 지위를 종료시키는 행위를 말합니다.
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    ⑤ ‘비회원’이라 함은 사이트의 일부 서비스만을 이용하기 위하여
                    회원으로 가입하지 않고 서비스를 이용하는 자를 말합니다.
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    ⑥ ‘NFT’보증서라 함은 블록체인을 기반으로 완성된 디지털
                    NFT보증서 입니다.
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    ⑦ ‘NFT’등록이라 함은 에이치오토 주관하여 블록체인을 기반으로
                    발행된 디지털 보증서를 등록하는 것을 말합니다.
                  </Text>
                </View>
              </View>
              <View style={MarginTop(20)}>
                <Text style={Font.TermsOfServiceTitle}>
                  제 3조 (약관의 효력 및 변경)
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ①본 약관은 서비스 화면에 게시하거나 이용자에게 공시하고, 이에
                  동의한 회원이 본 약관에서 규정하는 서비스에 가입함으로써
                  효력이 발생합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ②회사는 회원이 회사의 홈페이지 또는 회사로부터 제공받은
                  응용프로그램(Application)에서 서비스 이용 동의 확인에 관하여
                  동의를 표시한 경우, 이용자가 이 약관의 내용을 모두 읽고 이를
                  충분히 이해하였으며, 이를 적용하는 것에 동의한 것으로
                  간주합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ③회사는 약관의 규제에 관한 법률, 정보통신망 이용촉진 및
                  정보보호 등에 관한 법률 등 관계 법령에 위배되지 않는 범위에서
                  약관을 변경할 수 있으며 변경할 경우, 적용일자 및 개정사유를
                  명시하여 현행약관과 함께 "서비스"의 초기화면에 30일 이전부터
                  적용일자 전까지 공지합니다. 단, 회원에게 불리한 약관의 개정인
                  경우에는 공지 외에 전자우편, 메일 등 가능한 수단을 통해 별도로
                  통지합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ④회사가 전항에 따라 개정약관을 공지 또는 통지하면서 이용자에게
                  개정약관 적용 기간 내에 의사표시를 하지 않으면 의사표시가
                  표명된 것으로 본다는 뜻을 명확하게 따로 공지 또는
                  통지하였음에도 이용자가 명시적으로 거부의사를 표시하지 아니한
                  경우 이용자는 개정 약관에 동의한 것으로 봅니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ⑤"회원"은 개정약관에 대해 동의하지 않을 권리가 있으며
                  개정약관에 동의하지 않을 경우 본 약관에서 규정하는 서비스의
                  이용을 중단하고, 에이치오토 서비스 이용계약을 해지할 수
                  있습니다
                </Text>
              </View>
              <View style={MarginTop(20)}>
                <Text style={Font.TermsOfServiceTitle}>제 4조 (회원인증)</Text>
                <Text style={Font.TermsOfServiceContent}>
                  ①이용자는 회사가 정한 인증절차를 거치한 후 약관에 동의하고
                  이에 대하여 회사가 승낙함으로써 회원으로 인증되며 인증은 최초
                  한 번만 하면 됩니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ②타인의 이메일 주소를 도용하여 인증신청을 한 회원의 모든
                  정보는 삭제되며, 관계법령에 따라 처벌을 받을 수 있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ③회사는 회원인증신청 이용자 중 다음 각 호에 해당하는 경우
                  인증신청을 허락하지 않을 수 있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  1.인증신청자가 본 약관 제5조 1항에 의거 이전에 회원자격을
                  상실한 적이 있는 경우
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  2.기타 회원으로 등록하는 것이 "서비스"의 기술상 현저히 지장이
                  있다고 판단되는 경우
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  3.다른 사람의 명의를 사용하는 등 허위로 신청하는 경우
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  4.회사가 정한 서비스 가입 및 이용을 위해 필요한 요건이
                  충족되지 않을 경우(개인정보 수집이용 동의 거부 내지 철회 등
                  포함)
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ④이용자가 회원 인증 후 서비스를 사용한 기록(NFT보증서확인,
                  차량등록증확인, 보험가입증명서 확인, 커뮤니티 등)은 모두
                  서버에 저장 및 이용되며 앱을 삭제하거나 로그아웃 하여도 저장된
                  기록은 삭제되지 않습니다.
                </Text>
              </View>
              <View style={MarginTop(20)}>
                <Text style={Font.TermsOfServiceTitle}>
                  제 5조 (회원 자격 상실)
                </Text>
                <View style={{display: 'flex', flexDirection: 'column'}}>
                  <Text style={Font.TermsOfServiceContent}>
                    ①회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을
                    상실(제한, 정지)시킬 수 있습니다. 단, 회사는 사전에 소명할
                    기회를 회원에게 부여합니다.
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    1. 다른 사람의 "서비스" 이용을 방해하거나 그 정보를 도용하는
                    등 전자거래질서를 위협하는 경우
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    2. "서비스"를 이용하여 법령과 이 약관이 금지하거나
                    공서양속에 반하는 행위를 하는 경우
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    ②회사가 회원자격을 상실시키는 경우에는 고객의 서비스 해지 시
                    고객정보를 즉시 삭제합니다. 다만, 개인을 식별할 수 있는
                    정보를 제거한 후 서비스 개선 및 기타 사업 목적을 위해
                    보관합니다.
                  </Text>
                </View>
              </View>
              <View style={MarginTop(20)}>
                <Text style={Font.TermsOfServiceTitle}>
                  제 6조 (회원에 대한 통지)
                </Text>
                <View style={{display: 'flex', flexDirection: 'column'}}>
                  <Text style={Font.TermsOfServiceContent}>
                    ①회사가 회원에 대한 통지를 하는 경우, 전자우편, E-mail 등
                    가능한 수단을 이용할 수 있습니다.
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    ②회사는 불특정다수 회원에 대한 통지의 경우 30일 이상
                    에이치오토 서비스 자체 공지메뉴에 게시함으로써 개별 통지에
                    갈음 할 수 있습니다.
                  </Text>
                </View>
              </View>
              <View style={MarginTop(20)}>
                <Text style={Font.TermsOfServiceTitle}>
                  제 7조 (서비스 내용)
                </Text>
                <View style={{display: 'flex', flexDirection: 'column'}}>
                  <Text style={Font.TermsOfServiceContent}>
                    ①이 약관에 기초하여 이용자가 이용할 수 있는 서비스의 내용은
                    별도로 정합니다.
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    ②회사는 이용자에게 사전 통지 후 서비스의 일부 혹은 전부를
                    변경할 수 있습니다.
                  </Text>
                </View>
              </View>
              <View style={MarginTop(20)}>
                <Text style={Font.TermsOfServiceTitle}>
                  제 8조 (서비스 이용)
                </Text>
                <View style={{display: 'flex', flexDirection: 'column'}}>
                  <Text style={Font.TermsOfServiceContent}>
                    ①서비스의 이용은 회사의 업무상 또는 기술상 특별한 지장이
                    없는 한 연중무휴를 원칙으로 합니다. 다만, 이용시간은
                    정기점검 등의 필요로 인하여 회사가 정한 날 및 시간에
                    대해서는 예외 적용합니다.
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    ②회사는 시스템 등의 보수, 점검, 교체, 시스템의 고장, 통신의
                    두절, 기타 불가항력적 사유가 발생한 경우 내지 다음 각 호의
                    경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다. 이
                    경우 회사는 제6조(회원에 대한 통지)에서 정한 방법으로
                    회원에게 통지합니다. 다만, 회사가 사전에 통지할 수 없는
                    부득이한 사유(예: 예상치 못한 시스템, 통신장애 등)가 있는
                    경우 사후에 통지할 수 있습니다.
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    1.시스템 보수를 정기적으로, 또는 긴급히 행하는 경우
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    2.화재, 정전 등에 따라 서비스 제공을 할 수 없게 된 경우
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    3.지진, 분화, 홍수, 해일 등의 천재에 따라 서비스 제공을 할
                    수 없는 경우
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    4.전쟁, 폭동, 소란, 노동쟁의 등에 의해 서비스 제공을 할 수
                    없는 경우
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    5.통신사업자에 의해 통신 서비스가 정지된 경우
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    6.그 외 운용 또는 기술상, 회사가 서비스 제공의 일시적인
                    중단이 필요하다고 판단한 경우
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    ③회사는 필요한 경우 정기점검을 실시할 수 있으며,
                    정기점검시간은 서비스 제공화면에 공지한 바에 따릅니다.
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    ④회사는 2항 및 3항의 사유로 서비스 제공이 일시적으로
                    중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대해서는
                    관련법에 특별한 규정이 없는 한 "회원"에게 별도의 보상을 하지
                    않습니다.
                  </Text>
                </View>
              </View>
              <View style={MarginTop(20)}>
                <Text style={Font.TermsOfServiceTitle}>
                  제9조 (회원의 의무)
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ①회원은 본 서비스와 관련하여 자신의 개인정보가 부정하게 이용된
                  것을 발견한 경우 반드시 회사에 그 사실을 통보하여야 합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ②회원은 본 약관 및 관계법령에 규정한 사항을 준수하여야 합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ③회원 본인 이외에 제3자 이용에 따른 모든 책임은 회원에게
                  있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ④회원은 회사가 사전 서면 승인한 경우를 제외하고 영리 목적 혹은
                  그 준비를 목적으로 본 서비스를 이용할 수 없습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ⑤회원은 회사가 제공하는 서비스의 내용이 저작권, 상표권, 특허권
                  등의 법적 보호 하에 있음을 알고, 자의적으로 복사, 저장, 재생,
                  배포, 전시, 출판 등의 행위를 할 수 없습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ⑥회원은 본 서비스와 관련된 차량정보가 수집, 가공, 전송하는
                  절차를 거쳐 제공됨으로써 차량내 표시되는 정보와 다를 수 있다는
                  점을 인지하며, 이에 대해 회사에 이의를 제기 할 수 없습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ⑦회원은 회사가 보유한 자신의 개인정보 및 서비스 이용 정보를
                  개인적 사유(앱 미사용 등)로 삭제하고자 하는 경우, 반드시 전화
                  및 웹사이트 등 문의를 통해 삭제 요청을 해야 하며 삭제 요청 시
                  회사는 즉시 요청 정보를 삭제합니다.
                </Text>
              </View>
              <View style={MarginTop(20)}>
                <Text style={Font.TermsOfServiceTitle}>
                  제10조 (저작권의 귀속 및 이용제한)
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ①회사가 작성한 저작물에 대한 저작권, 기타 지적재산권은 회사에
                  귀속합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ②이용자는 "서비스"를 이용함으로써 얻은 정보를 회사의 사전 서면
                  승낙없이 복제, 송신, 출판, 배포, 방송, 기타 방법에 의하여
                  영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
                </Text>
              </View>
              <View style={MarginTop(20)}>
                <Text style={Font.TermsOfServiceTitle}>
                  제11조 (게시물의 저작권 및 관리)
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ①"회원"이 작성한 저작물에 대한 저작권 기타 지적재산권은
                  "회원"에 귀속합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ②회원의 게시물이 "정보통신망법" 및 "저작권법" 등 관련법에
                  위반되는 내용을 포함하는 경우, 권리자는 관련법이 정한 절차에
                  따라 해당 게시물의 게시중단 및 삭제 등을 요청할 수 있으며,
                  회사는 관련법에 따라 조치를 취합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ③회사는 전항에 따른 권리자의 요청이 없는 경우라도 권리침해가
                  인정될 만한 사유가 있거나 기타 홈페이지 정책 및 관련법에
                  위반되는 경우에는 관련법에 따라 해당 게시물에 대해 임시조치
                  등을 취합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ④본 조에 따른 세부절차는 "정보통신망법" 및 "저작권법"이 규정한
                  범위 내에서 회사가 정한 "게시중단요청서비스"에 따릅니다.
                </Text>
              </View>
              <View style={MarginTop(20)}>
                <Text style={Font.TermsOfServiceTitle}>제12조 (분쟁해결)</Text>
                <Text style={Font.TermsOfServiceContent}>
                  "서비스"는 이용자로부터 제출되는 불만사항 및 의견이 정당하다고
                  판단되는 경우 우선적으로 그 사항을 처리합니다. 다만, 신속한
                  처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 통보할
                  수 있습니다
                </Text>
              </View>
              <View style={MarginTop(20)}>
                <Text style={Font.TermsOfServiceTitle}>
                  제13조 (준거법 및 재판관할)
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ①회사와 "회원"간 제기된 소송은 대한민국법률을 준거법으로
                  합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ②회사와 "회원" 간 발생한 분쟁에 관한 소송은 민사소송법 상의
                  관할법원에서 해결하며, 개인(위치)정보의 수집과 관련하여 회사와
                  회원 사이에 분쟁이 발생한 경우 회사와 고객은 분쟁의 해결을
                  위해 성실히 협의하여야 하고, 협의로 분쟁이 해결되지 않을 경우
                  양 당사자는 "정보통신망 이용촉진 및 정보보호 등에 관한 법률"에
                  의한 개인정보분쟁조정 위원회에 분쟁조정을 신청할 수 있습니다.
                </Text>
              </View>
              <View style={MarginTop(20)}>
                <Text style={Font.TermsOfServiceTitle}>제14조(손해배상)</Text>
                <Text style={Font.TermsOfServiceContent}>
                  ①회원이 이 약관의 규정을 위반함으로 인하여 회사에 손해가
                  발생하게 되는 경우에는 회사에 발생한 손해를 배상하여야 합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ②회원의 불법행위나 약관 위반행위로 인하여 회사가 제3자로부터
                  손해배상청구 또는 소송을 비롯한 각종 이의제기를 받는 경우 당해
                  불법행위 또는 약관 위반행위를 한 자는 자신의 책임과 비용으로
                  회사를 면책시켜야 하며, 회사가 면책되지 못한 경우 그로 인하여
                  회사에 발생한 손해를 배상하여야 합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ③회사가 이 약관의 규정을 위반하거나 관계 법령을 위반하여
                  고객에게 손해가 발생한 경우 회사가 고의 또는 과실이 없음을
                  입증하지 아니하면 고객의 손해에 대해 책임을 집니다. 다만,
                  회사는 서비스를 사용하지 못한 결과 혹은 사용한 결과로 추정될
                  수 있는 다음 각호의 1에 해당하는 간접적인 손해에 대해서는
                  책임을 면합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  1.서비스 이용으로 야기된 영업상의 손실
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  2.서비스 이용 불가능한 사유로 야기된 영업상의 손실
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  3.기타 서비스 이용 결과에 따른 간접적인 피해의 일체
                </Text>
              </View>
              <View style={MarginTop(20)}>
                <Text style={Font.TermsOfServiceTitle}>제 15조(면책사항)</Text>
                <Text style={Font.TermsOfServiceContent}>
                  ①회사는 천재지변 또는 이에 준하는 불가항력으로 인하여
                  개인(위치)정보를 수집할 수 없는 경우 또는 OBD 단말기 자체의
                  고장, 오류 등의 경우 이에 관한 책임이 면제됩니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ②회사는 고객의 귀책사유로 인하여 회사가 개인(위치)정보를
                  수집하지 못하거나 잘못 수집하여 발생하는 서비스의 이용장애에
                  대하여 책임을 지지 않습니다.
                </Text>
              </View>
              <View style={MarginTop(20)}>
                <Text style={Font.TermsOfServiceTitle}>
                  제16조(서비스 이용 정지)
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ①회사는 다음 각 호의 1에 해당하는 경우 계정에 대한 서비스
                  이용을 정지할 수 있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  1.타인 명의를 도용하거나 허위정보를 이용한 청약임이 확인된 때
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  2.회원이 이 약관에서 정한 의무를 위반한 경우
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ②회사가 사전 통지한 후 약관 등 주요정책을 변경하는 경우,
                  회원이 이에 동의하지 않을 때에는 통지한 내용이 반영되기
                  이전부터 서비스를 이용하지 않거나 앱을 삭제하는 방법으로
                  약관에 거부할 수 있으며 이후 약관에 동의하면 수시로 서비스를
                  재이용할 수 있습니다.
                </Text>
              </View>
              <View style={MarginTop(20)}>
                <Text style={Font.TermsOfServiceTitle}>
                  제17조(서비스 제공의 중단 또는 종료)
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  회사는 다음 각 호의 어느 하나에 해당하는 사유가 발생하는 경우,
                  서비스 종료 사유 및 종료일자 등을 종료 예정일로부터 [60]일
                  전까지 우편, SMS, 전자우편, 유∙무선 전화 등 회원이 명확히
                  인식할 수 있는 방법으로 회원에게 통지함으로써 서비스의 제공을
                  중단 또는 종료할 수 있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ①사업환경의 변화 또는 기술 발전 등으로 인하여 서비스를 계속
                  제공하는 것이 현저히 곤란한 경우
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ②행정기관의 행정처분(방송통신위원회의 폐지나 휴지 승인을
                  포함)이나 법원의 판결, 결정 등으로 인하여 서비스를 계속 제공할
                  수 없는 경우
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ③전시, 사변, 천재지변 기타 불가항력적 사유로 서비스를 제공하는
                  것이 현저히 곤란한 경우
                </Text>
              </View>
              <View style={MarginTop(20)}>
                <Text style={Font.TermsOfServiceTitle}>
                  제 18조 (약관외 준칙)
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  이 약관에 명시되지 않은 사항에 대해서는 "위치정보의 보호 및
                  이용 등에 관한 법률", "정보통신망이용촉진 및 보호 등에 관한
                  법률" 등 관계 법령과 위치정보 수집 및 이용 동의 약관 등의
                  규정에 따릅니다.
                </Text>
                <TouchableOpacity
                  style={TermsOfServiceStyles.Button}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Text style={globalStyles.ButtonText}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{marginTop: '10%', backgroundColor: '#F2F6F8'}}></View>
      </View>
    </View>
  );
};

export default TermsOfService;
