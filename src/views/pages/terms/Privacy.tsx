import {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {Font} from '../../../assets/css/global/newFont';
import {globalStyles} from '../../../assets/css/global/styleSheet';
import TermsOfServiceStyles from '../../../assets/css/termsOfService/termsOfService';
import TopNav from '../../../components/topNav/TopNav';

const Privacy = ({navigation}: any) => {
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
          <TopNav navigation={navigation} title="개인정보"></TopNav>
          <View style={TermsOfServiceStyles.MainContainer}>
            <View style={TermsOfServiceStyles.ContentWrap}>
              <Text style={Font.TermsOfServiceContent}>
                주식회사 에이치오토 개인정보 처리방침 주식회사 에이치오토(이하
                "회사"라 함)는 귀하의 개인정보 보호를 매우 중요시하며,
                '개인정보보호법'을 준수하고 있습니다. 회사는 개인정보 처리방침을
                통하여 귀하께서 제공하시는 개인정보가 어떠한 용도와 방식으로
                이용되고 있으며 개인정보보호를 위해 어떠한 조치가 취해지고
                있는지 알려드립니다. 회사의 개인정보 처리방침은 개인정보보호와
                관련한 법률 또는 지침의 변경, 회사 정책의 변화에 따라 변경될 수
                있습니다. 회사의 개인정보 처리방침을 개정하는 경우 홈페이지에
                공지할 것입니다.
              </Text>
              <Text style={Font.TermsOfServiceTitle}>
                1. 개인정보 수집범위 및 수집방법
              </Text>
              <Text style={Font.TermsOfServiceContent}>
                1) 개인정보 수집범위
              </Text>
              <Text style={Font.TermsOfServiceContent}>
                가. 회사는 업무수행을 위해 필요한 최소한의 개인정보만을 수집하고
                있으며, 만 19세 이상 성인만 개인정보 수집 대상이 됩니다. 선택
                항목은 입력하지 않더라도 서비스 이용에는 제한이 없습니다.
              </Text>
              <Text style={Font.TermsOfServiceContent}>
                나. 고객의 인권 침해 우려가 있는 민감한 개인정보(인종 및 민족,
                사상 및 신조, 출신지 및 본적지, 정치적 성향 및 범죄 기록, 건강
                상태 및 성생활 등)은 수집하지 않습니다.
              </Text>
              <Text style={Font.TermsOfServiceContent}>
                2) 개인정보 수집방법
              </Text>
              <Text style={Font.TermsOfServiceContent}>
                가. 회사의 홈페이지, 서면양식, 전화/팩스, 전자우편 등에 의한
                개인정보 수집동의 절차에 거쳐 수집
              </Text>
              <Text style={Font.TermsOfServiceContent}>
                나. 상담내역 및 이력, 결제기록, 이용기록 등 통상적인 서비스
                제공과정에서 자동적으로 수집, 생성되는 정보의 수집
              </Text>
              <Text style={Font.TermsOfServiceTitle}>
                2. 개인정보 수집 및 이용 목적
              </Text>
              <Text style={Font.TermsOfServiceContent}>
                회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다. 고객이
                제공한 모든 정보는 다음에 기술한 목적 이외로는 사용되지 않으며,
                이용 목적이 변경될 시에는 사전 동의를 구할 것 입니다.
              </Text>
              <View style={{marginTop: '3%'}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '1%',
                    justifyContent: 'space-between',
                    // marginRight:15
                  }}>
                  <Text style={styles.tableTitle}>구분</Text>
                  <Text style={styles.tableTitle}>수집항목</Text>
                  <Text style={styles.tableTitle}>수집목적</Text>
                  <Text style={styles.tableTitle}>보유기간</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: '-3%',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.tableText}>Google</Text>
                  <Text style={styles.tableText}>필수</Text>
                  <Text style={styles.tableText}>별명,이메일주소</Text>
                  <Text style={styles.tableText}>
                    회원가입 회원 탈퇴후 3개월 이내
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: '-3%',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.tableText}>Facebook</Text>
                  <Text style={styles.tableText}>필수</Text>
                  <Text style={styles.tableText}>별명,이메일주소</Text>
                  <Text style={styles.tableText}>
                    회원가입 회원 탈퇴후 3개월 이내
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: '-3%',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.tableText}>Apple</Text>
                  <Text style={styles.tableText}>필수</Text>
                  <Text style={styles.tableText}>별명,이메일주소</Text>
                  <Text style={styles.tableText}>
                    회원가입 회원 탈퇴후 3개월 이내
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: '-3%',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.tableText}>Server</Text>
                  <Text style={styles.tableText}>필수</Text>
                  <Text style={styles.tableText}>IP주소,서비스 이용기록</Text>
                  <Text style={styles.tableText}>
                    방문기록 서비스이용과정에서 자동 수집 회원 탈퇴후 12개월
                    이내
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: '-3%',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.tableText}>주행기록,주행일지</Text>
                  <Text style={styles.tableText}>선택</Text>
                  <Text style={styles.tableText}>
                    사용자 이름, 부서 주행기록, 주행일지
                  </Text>
                  <Text style={styles.tableText}>
                    수정시 회원이 기입 회원 탈퇴후 3개월 이내
                  </Text>
                </View>
                <Text style={Font.TermsOfServiceTitle}>
                  3. 개인정보 수집에 대한 동의
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  회사가 고객 개인정보를 수집할 시 반드시 적법한 절차를 통해
                  회원 동의를 받는 것을 원칙으로 하며, 인터넷 상에서 이용약관 및
                  개인정보 처리방침에 동의하는 절차를 거칩니다. 고객께서 (예,
                  동의합니다) 문구 확인 및 구두 동의를 통하여 개인정보 수집에
                  대해 동의한 것으로 간주합니다
                </Text>
                <Text style={Font.TermsOfServiceTitle}>
                  4. 개인정보의 목적 외 사용 및 제3자에 대한 정보 제공
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  1) 고객의 개인정보는 이용자의 사전 동의 없이 [개인정보
                  수집범위 및 수집방법] 및 [개인정보 수집 및 이용 목적]에서
                  고지한 범위 내에서 사용하며, 동 범위를 초과하여 이용하거나
                  타인 또는 타기업, 기관에 제공하지 않습니다. 단, 고객의 동의가
                  있거나 다음 사항의 경우 예외로 합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  - 서비스 제공에 따른 요금 정산을 위해 필요한 경우
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  - 서비스의 제공에 관한 계약의 이행을 위해 필요한 개인정보로서
                  경제적, 기술적인 사유로 통상의 동의를 받는 것이 현저히 곤란한
                  경우
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  - 법적, 수사상의 목적으로 관련 기관의 요구가 있는 경우 또는
                  관계법령에 특별한 규정이 있는 경우, 법률에 규정된 바에 따라
                  적법한 절차를 따라 제공
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  2) 회사는 제3자에게 고객의 개인정보를 제공하지 않습니다.
                </Text>
                <Text style={Font.TermsOfServiceTitle}>
                  5. 개인정보 보유∙이용기간 및 파기
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  1) 개인정보의 수집목적 또는 제공받은 목적이 달성된 때에는
                  고객의 개인정보를 지체 없이 파기합니다. (단, 고객의 사전동의에
                  의한 수집정보는 동의한 기간에 따름)
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  가. 이용기간: 서비스 가입일부터 해지일 또는 제공계약 종료일 중
                  먼저 도래하는 시점
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  나. 보유기간: 상세정보는 [개인정보 수집 및 이용 목적]을
                  참조바랍니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  2) 상법 등 관련법령의 규정에 의하여 다음과 같이 거래 관련 관리
                  의무 관계의 확인 등을 이유로 보유하여야 할 필요가 있을
                  경우에는 해당기간 동안 보유합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  가. 서비스 이용 관련 개인정보(로그인기록)
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  - 보존 근거 : 통신비밀보호법 제2조 제11호 마목, 동법 시행령
                  제41조 제2항 제2호
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  - 보존 기간 : 3개월
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  나. 계약 또는 청약철회 등에 관한 기록
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  - 보존 근거 : 전자상거래 등에서의 소비자보호에 관한 법률 제6조
                  제3항, 동법 시행령 제6조 제1항 제2호 제41조 제2항 제2호
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  - 보존 기간 : 5년
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  다. 대금결제 및 재화 등의 공급에 관한 기록
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  - 보존 근거 : 전자상거래 등에서의 소비자보호에 관한 법률 제6조
                  제3항, 동법 시행령 제6조 제1항 제3호
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  {' '}
                  - 보존 기간 : 5년
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  라. 소비자의 불만 또는 분쟁처리에 관한 기록
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  - 보존 근거 : 전자상거래 등에서의 소비자보호에 관한 법률 제6조
                  제3항, 동법 시행령 제6조 제1항 제4호
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  {' '}
                  - 보존 기간 : 3년
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  마. 표시/광고에 관한 기록
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  - 보존 근거 : 전자상거래 등에서의 소비자보호에 관한 법률 제6조
                  제3항, 동법 시행령 제6조 제1항 제1호
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  {' '}
                  - 보존 기간 : 6개월
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  바. 신용정보의 수집/처리 및 이용 등에 관한 기록
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  - 보존 근거 : 신용정보의 이용 및 보호에 관한 법률 제20조 제2항
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  {' '}
                  - 보존 기간 : 3년
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  사. 요금의 과납 또는 미납이 있을 경우와 분쟁이 있을 경우 해결
                  시까지 보유 합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  3) 개인정보유효기간제 실시
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  회사는 개인정보보호법 제39조의6(개인정보의 파기에 대한 특례)
                  에 따라 5년이상 당사의 서비스를 이용하지 않은 경우는 법률에서
                  정한 특별한 개인정보 보유사유에 해당하지 않는 경우 즉시
                  파기합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>4) 파기절차</Text>
                <Text style={Font.TermsOfServiceContent}>
                  회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보
                  보호책임자의 승인을 받아 개인정보를 파기합니다
                </Text>
                <Text style={Font.TermsOfServiceContent}>5) 파기방법</Text>
                <Text style={Font.TermsOfServiceContent}>
                  가. 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는
                  기술적 방법을 사용하여 파기
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  나. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 파기
                  인증업체를 통하여 소각처리
                </Text>
                <Text style={Font.TermsOfServiceTitle}>
                  6. 개인정보의 위탁 처리
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  회사는 서비스 향상을 위해 고객님의 개인정보를 외부에 수집,
                  처리, 관리 등을 위탁하여 처리할 수 있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  1) 개인정보의 처리를 위탁 시 위탁자와 수탁자 간의 관계 및 책임
                  범위 등에 관한 사항을 서면, 전화, E-mail 또는 홈페이지를 통해
                  사전 공지합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  2) 개인정보의 처리를 위탁 시 개인정보보호 관련 사항엄수,
                  개인정보에 관한 기밀유지 등을 명확히 규정합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  3) 회사는 보다 나은 서비스 제공과 고객편의 제공 등 업무수행을
                  원활하게 하기 위해 고객님의 개인정보를 다음과 같이 외부
                  전문업체에 처리위탁(수집. 보관. 처리. 이용. 제공. 관리. 폐기
                  등)하여 처리하고 있습니다. 수탁자에 대해서는 관련 법규 및
                  지침의 준수, 제3자 제공 금지, 사고 시 책임부담, 위탁기간 종료
                  즉시 개인정보의 반납/파기 의무 등을 규정하여 관리하고
                  있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  4) 서비스 향상을 위해서 회원의 개인정보를 위탁업체에서 수집,
                  분석하고 있으며, 관계 법령에 따라 위탁계약 시 개인정보가
                  안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  가. 수탁자, 수탁범위, 공유 정보의 범위 등에 관한 사항을
                  전자우편, 전화 또는 홈페이지를 통해 게시합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  나. 위탁계약 시 서비스 제공자의 개인정보보호 관련 지시엄수,
                  개인정보에 관한 비밀유지, 제3자 제공의 금지 등을 규정하고
                  계약내용을 전자적으로 보관합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  다. 현재 개인정보처리수탁자와 그 업무의 내용은 다음과
                  같습니다.
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text style={styles.tableTitle}>수탁업체</Text>
                  <Text style={styles.tableTitle}>위탁업무내용</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text style={styles.tableText}>㈜페이머스워커 </Text>
                  <Text style={styles.tableText}>서버 임대 및 관리</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: '5%',
                  }}>
                  <Text style={styles.tableText}>주식회사 케이티</Text>
                  <Text style={styles.tableText}>
                    대표번호, ARS, 녹취 시스템 구축, 관리
                  </Text>
                </View>
                <Text style={Font.TermsOfServiceTitle}>
                  7. 개인정보 자동수집 장치의 설치 운영 및 그 거부에 관한 사항
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  회사는 고객의 정보를 수시로 저장하고 찾아내는 '쿠키(cookie)'를
                  설치 운용 합니다. 쿠키란 회사의 웹사이트를 운영하는데 이용되는
                  서버가 고객의 브라우저에 보내는 작은 텍스트 파일로서 고객의
                  컴퓨터 하드디스크에 저장됩니다. 회사는 다음과 같은 목적을 위해
                  쿠키 등을 사용합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  1) 쿠키 등 사용 목적
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  가. 홈페이지 회원과 비회원의 접속 빈도나 방문 시간 등을 분석,
                  고객의 취향과 관심분야를 파악 및 자취 추적, 각종 이벤트 참여
                  정도 및 방문 회수 파악 등을 통한 타깃 마케팅 및 개인 맞춤
                  서비스 제공
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  나. 고객은 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서,
                  고객은 웹 브라우저에서 옵션을 설정함으로써 모든 쿠키를
                  허용하거나, 쿠키가 저장될 때마다 확인을 거치거나아니면 모든
                  쿠키의 저장을 거부할 수도 있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  2) 쿠키 설정 거부 방법
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  가. 쿠키 설정을 거부하는 방법으로는 고객님이 사용하는 웹
                  브라우저의 옵션을 선택함으로써 모든 쿠키를 허용하거나 쿠키를
                  저장할 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수
                  있습니다
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  나. 설정방법 예(인터넷 익스플로어의 경우): 웹 브라우저 상단의
                  도구 &gt; 인터넷 옵션 &gt; 개인정보
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  3) 단, 고객께서 쿠키 설치를 거부하였을 경우 서비스 제공에
                  어려움이 있을 수 있습니다.
                </Text>
                <Text style={Font.TermsOfServiceTitle}>8. 링크사이트</Text>
                <Text style={Font.TermsOfServiceContent}>
                  회사는 고객에게 다른 회사의 웹사이트 또는 자료에 대한 링크를
                  제공할 수 있습니다. 이 경우 회사는 외부사이트 및 자료에 대한
                  아무런 통제권이 없으므로 그로부터 제공받는 서비스나 자료의
                  유용성에 대해 책임질 수 없으며, 보증할 수 없습니다. 회사가
                  포함하고 있는 링크를 클릭 (Click)하여 타 사이트 (Site)의
                  페이지로 옮겨갈 경우, 해당 사이트의 개인정보 보호정책은 회사와
                  무관하므로 새로 방문한 사이트의 정책을 검토해 보시기 바랍니다.
                </Text>
                <Text style={Font.TermsOfServiceTitle}>
                  9. 정보주체의 권리, 의무 및 그 행사방법에 관한 사항
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  1) 고객은 개인정보의 수집, 이용 및 제공에 대해 동의하신 내용을
                  언제든지 철회할 수 있습니다. 개인정보의 열람, 정정, 처리정지,
                  또는 삭제 요청을 할 수 있으며, 홈페이지 회원은 홈페이지를
                  통해, 일반 회원은 호텔 방문 및 개인정보 보호책임자에게 E-mail
                  로 연락하시면 지체 없이 파기하는 등 필요한 조치가
                  이루어집니다. 단, 법에서 정한 의무 사항이 있으면 권리 행사가
                  제한 될 수 있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  2) 이용자가 입력한 부정확한 정보로 인해 발생하는 사고의 책임은
                  이용자 본인에게 있으며, 타인 정보의 도용 등 허위정보를 입력할
                  경우 회원자격이 상실될 수 있습니다. 또한 모든 법적인 책임은
                  도용 또는 허위정보를 입력한 자의 책임으로 됩니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  3) 고객은 개인정보를 보호받을 권리와 함께 스스로를 보호하고
                  타인의 정보를 침해하지 않을 의무도 가지고 있습니다. 비밀번호를
                  포함한 고객의 개인정보가 유출되지 않도록 조심하시고 게시물을
                  포함한 타인의 개인정보를 훼손하지 않도록 유의해 주십시오. 만약
                  이 같은 책임을 다하지 못하고 타인의 정보 및 존엄성을 훼손할
                  시에는 ‘개인정보 보호법’ 등에 의해 처벌받을 수 있습니다.
                </Text>
                <Text style={Font.TermsOfServiceTitle}>
                  10. 고객 의견수렴•불만처리 및 개인정보 보호책임자
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  1) 회사는 개인정보 보호와 관련하여 언제든지 고객께서 의견 및
                  불만을 제기할 수 있는 창구를 마련하고 있으며, 회사 홈페이지 및
                  고객관리부서 담당자와의 연락을 통해 신속한 처리 및 결과를
                  알려드립니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  2) 회사는 고객의 개인정보를 보호하고 개인정보와 관련한 불만을
                  처리하기 위하여 아래와 같이 개인정보보호 책임자를 두고
                  있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  3) 정보주체는 개인정보보호법 제35조에 따른 개인정보의 열람
                  청구를 할 수 있으며, 아래의 개인정보 보호담당자가 개인정보
                  열람청구 업무를 담당합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ▶개인정보 보호책임자 : 윤세희
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  이메일 주소: ysh@hauto.kr
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  ▶개인정보 보호담당자 : 윤세희
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  이메일 주소: ysh@hauto.kr
                </Text>
                <Text style={Font.TermsOfServiceTitle}>
                  11. 개인정보 보호를 위한 안전성 확보조치
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  회사는 고객의 개인정보를 처리함에 있어 개인정보가 분실, 도난,
                  누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 아래와
                  같은 대책들을 강구하고 있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>1) 기술적 대책</Text>
                <Text style={Font.TermsOfServiceContent}>
                  회사는 귀하의 개인정보를 처리함에 있어 개인정보가 분실, 도난,
                  누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과
                  같은 기술적 대책을 강구하고 있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  가. 귀하의 개인정보는 비밀번호에 의해 보호되며, 파일 및 전송
                  데이터를 암호화하여 중요한 데이터는 별도의 보안기능을 통해
                  보호되고 있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  나. 응용 프로그램의 공격을 통한 정보 유출을 막기 위한 보안
                  장치(웹 보안 및 VPN 등)을 가동하고 있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  다. 회사는 백신 및 패치 자동 설치 프로그램을 이용하여, 컴퓨터
                  바이러스에 의한 피해를 방지하기 위한 조치를 취하고 있습니다.
                  해당 프로그램은 주기적으로 업데이트되며 갑작스런 바이러스가
                  출현할 경우, 즉시 패치를 적용함으로써 개인정보가 침해되는 것을
                  방지하고 있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  라. 해킹 등 외부로부터 고객님의 개인정보가 유출되는 것을
                  방지하기 위해 각 서버마다 침입차단시스템 및 취약점 분석
                  시스템(방화벽, IPS 및 서버보안 등)등의 보안 장치를 사용하여
                  침입의 차단 및 모니터링을 수행하고 있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>2) 관리적 대책</Text>
                <Text style={Font.TermsOfServiceContent}>
                  가. 회사는 귀하의 개인정보에 대한 접근권한을 최소한의 인원으로
                  제한하고 있으며 그에 해당하는 자는 다음과 같습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  - 개인정보 보호책임자 및 담당자 등 개인정보 관리업무를
                  수행하는 자
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  - 이용자를 직접상대로 하여 마케팅 업무를 수행하는 자
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  - 기타 업무상 개인정보의 처리가 불가피한 자
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  나. 개인정보를 처리하는 직원을 대상으로 새로운 보안기술습득 및
                  개인정보보호의무 등에 관해 정기적인 사내 교육 및 외부
                  위탁교육을 실시하고 있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  다. 입사시, 전 직원의 보안서약서를 통하여 사람에 의한
                  정보유출을 사전에 방지하고 개인정보 보호정책에 대한 이행사항
                  및 직원의 준수 여부를 감사하기 위한 내부절차를 마련하고
                  있습니다
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  라. 개인정보 관련 처리자의 업무 인수인계는 보안이 유지된
                  상태에서 철저하게 이뤄지고 있으며, 입사 및 퇴사 후 개인 정보
                  사고에 대한 책임을 명확히 하고 있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  마. 개인정보와 일반 데이터를 혼합하여 보관하지 않고, 별도의
                  서버를 통해 분리하여 보관하고 있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  바. 전산실 및 자료 보관실은 특별 보호구역으로 설정하여 출입을
                  통제하고 있습니다
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  사. 회사는 이용자 개인의 실수나 기본적인 인터넷의 위험성
                  때문에 일어나는 일들에 대해 책임을 지지 않습니다. 회원
                  개개인이 본인의 개인정보를 보호하기 위해서 자신의 아이디
                  그리고 비밀번호를 적절하게 관리하고 여기에 대한 책임을 져야
                  합니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  아. 그 외 내부 관리자의 실수나 기술관리 상의 사고로 인해
                  개인정보의 상실, 유출, 변조, 훼손이 유발될 경우 회사는 즉각
                  귀하께 사실을 알리고 적절한 대책을 강구할 것입니다.
                </Text>
                <Text style={Font.TermsOfServiceTitle}>
                  12. 권익침해 구제방법
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제,
                  상담 등을 문의하실 수 있습니다.
                </Text>
                <Text style={Font.TermsOfServiceContent}>
                  아래의 기관은 회사와는 별개의 기관으로서, 회사의 자체적인
                  개인정보 불만처리, 피해구제 결과에 만족하지 못하시거나 보다
                  자세한 도움이 필요하시면 문의하여 주시기 바랍니다
                </Text>
                <View>
                  <Text style={Font.TermsOfServiceContent}>
                    1.개인정보 침해신고센터(한국인터넷진흥원 운영)
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    소관업무 : 개인정보 침해사실 신고, 상담 신청
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    웹사이트 : privacy.kisa.or.kr
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    전화 : (국번없이)118
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    주소 : (58324)전남 나주시 진흥길 9(빛가람동 301-2) 3층
                    개인정보침해신고센터
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    2. 개인정보 분쟁조정위원회
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    소관업무 : 개인정보 분쟁조정신청, 집단분쟁조정(민사적 해결)
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    웹사이트 : www.kopico.go.kr
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    전화 : (국번없이)18336972
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    주소 : (03171)서울특별시 종로구 세종대로 209 정부서울청사
                    4층
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    3. 대검찰청 사이버범죄수사단 : 1301 (www.spo.go.kr)
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    4. 경찰청 사이버안전국 : 182 (cyberbureau.police.go.kr)
                  </Text>
                  <Text style={Font.TermsOfServiceTitle}>
                    13. 개인정보 처리방침 변경에 관한 사항
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    본 개인정보처리방침은 정부의 정책 및 정보보호 유관법령 또는
                    보안기술의 변경에 따라 내용의 추가, 삭제 및 수정을 있을
                    시에는 개정 최소 7일 전부터 홈페이지를 통해 고지할 것입니다.
                    다만, 이용자의 권리와 관련된 중요한 변경이 있을 경우에는
                    개정 최소 30일 전부터 홈페이지를 통해 고지하겠습니다.
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    - 개인정보 처리방침 공고일자: 2023-08-01
                  </Text>
                  <Text style={Font.TermsOfServiceContent}>
                    - 개인정보 처리방침 시행일자: 2022-08-16
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={TermsOfServiceStyles.Button}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Text style={globalStyles.ButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={{marginTop: 10, backgroundColor: '#F2F6F8'}}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  full: {
    backgroundColor: '#F2F6F8',
    width: '100%',
    height: '100%',
  },

  text: {
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 35,
    marginLeft: '5%',
    color: '#292929',
    marginTop: '2%',
    marginRight: 10,
  },
  text2: {
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22,
    color: '#666666',
    marginLeft: '7%',
    marginRight: 10,
    marginTop: 8,
  },
  text3: {
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22,
    color: '#666666',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 8,
  },
  text4: {
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 22,
    color: '#666666',
    marginLeft: '8%',
    marginTop: 0,
  },
  tableTitle: {
    color: 'black',
    fontSize: 13,
    paddingLeft: 15,
    paddingRight: 15,
    // width: '15%',
  },
  tableText: {
    color: 'black',
    marginLeft: 20,
    marginRight: 10,
    width: '15%',
    fontSize: 10,
  },
  text5: {
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22,
    color: '#666666',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 8,
  },
  text6: {
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 22,
    color: '#666666',
    marginLeft: '13%',
    marginRight: '5%',
    marginTop: 0,
  },
});

export default Privacy;
