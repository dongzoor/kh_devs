package com.kh.devs.sendMail;

import com.kh.devs.dto.MailDTO;

import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class SendMail {
    public boolean sendMail(MailDTO mail) {
        String host = "smtp.gmail.com";
        final String user = "popiui0051@gmail.com";
        final String password = "dvtcdxiegeqfpsps";

        String sender = mail.getSender();
        String pwd = mail.getContent();
        String title = mail.getTitle();

        //Get the session object
        Properties props = new Properties();
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        props.put("mail.smtp.ssl.protocols", "TLSv1.2");

        Session session = Session.getDefaultInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {

                return new PasswordAuthentication(user, password);
            }
        });

        // 메세지 작성
        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(user));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(sender));

            //제목
            message.setSubject(title);

            //내용
            message.setText(new StringBuffer().append("회원님의 임시비밀번호는 <strong>")
                    .append(pwd)
                    .append("</strong>입니다.")
                    .append("새로운 비밀번호로 로그인 후 비밀번호를 변경해주시기 바랍니다.</P>").toString());

            // 이메일 해더
            message.setHeader("content-Type", "text/html");

            //메세지 보내기
            Transport.send(message);
//			System.out.println("메세지 전송 완료");
            return true;

        } catch (AddressException e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            return false;
        } catch (MessagingException e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            return false;
        }
    }
}
