
create schema joalarm collate utf8mb4_0900_ai_ci;
use joalarm;

create table accounts
(
    account_seq bigint auto_increment
        primary key,
    emoji       varchar(200) null,
    id          varchar(50)  null,
    password    varchar(100) null,
    report_cnt  int          null,
    constraint UK_1itig5iojk35p4k2xdnn4j232
        unique (id)
);

create table contacts
(
    contact_seq bigint auto_increment
        primary key,
    content     varchar(255) null,
    type        varchar(255) null
);




INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (1, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-otter-96.png', 'string', '$2a$10$QlzUPefRJ4H5JOvxzBn0J.VJf0bxqkYv03CQ0O.SnkdZQrKK9khPi', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (2, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-otter-96.png', 'cupidd', '$2a$10$P5hvIGAlCwWjHNX0px9OFOQwR0RZclRNQKqWVxKp80.TV5rdRCtEK', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (3, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/tom48.svg', 'test11', '$2a$10$jA9G91YrOF6yhHz/nsNVm.T.tDOKK1o9qIfi/36WsaX0VmkCxpdxW', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (4, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-otter-96.png', 'gkstmdgns422', '$2a$10$f3lrNe6Kpmz1FuHfFnVeeO/aZCccqnbYeU0cSNLq4YTxqo1Qc0Dk2', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (5, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-otter-96.png', 'string2', '$2a$10$pXYPsie2oeJ.Cdu6JLfRX.1cGEMwT7bGYU7eFH66Om39IbSDNgt3m', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (6, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-otter-96.png', 'string111', '$2a$10$qloWLeKzy.SeBlo6bV1FUOe/zxgqQCHcijFc4mLv4pJpwBdY8gAIu', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (7, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Cat.svg', 'test12', '$2a$10$PJyllUkPUn0tmoi7/fnB0..XrQ5Acuu.T5pGE7V8yspykFXV1eD1.', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (8, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-otter-96.png', 'test13', '$2a$10$TJ.q8MZE3eIFDZ/bNWBSuuva3hjE9Ne5qCQ64M7FaZnuVMtQ/W17i', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (9, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-otter-96.png', 'as1d2f345343', '$2a$10$t5jDIpNNoXvCvy17DVNYqeaE3GzkmoWLEfAGTipBE.jqwnn7AtJSq', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (10, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-otter-96.png', 'euneee', '$2a$10$XbJYll/Ao4vwG43EQf6xROmG0d8kPJfx.Qe9WyfJPx2sGcNbtkeU.', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (11, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-otter-96.png', 'abc123', '$2a$10$2D3BF/3m/AbOJB35cp2XyeT6EKxgCH3O3zTBjZhNrzeHI8Hdf8jRu', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (12, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-otter-96.png', 'eorat1', '$2a$10$IXyBY26l67LY/S2/FyulMOKUauZY/7O0E7box0nsN6g0wzcLyRRmK', 1);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (13, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-올빼미-96.png', 'eorat2', '$2a$10$6ylZKQ2/4wo./q/yRvd.0OjU2yAq7cUSLA8j6T96Ut3Zbd.ueFn/a', 4);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (14, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/tom48.svg', 'test22', '$2a$10$o3zBL32HKTFrI79TxIcoVekjEJpCdxpDCxt1JVV.HdR2zDFA75x1K', 1);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (15, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-카와이이-96.png', 'test23', '$2a$10$cbIq6y2774AmW/gzfx9/MOevyXEh2Lu875J6jq3o0A2WEQW/iZ90C', 2);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (16, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Dog.svg', 'test99', '$2a$10$eOK13Cs8JlNBKRcyjRDijeHk/U4XNF.5Lm8w33VxQ.7VeZWjQ0UWq', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (17, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/uzumaki48.svg', 'test33', '$2a$10$l.xZ8hHjT.JHA/YkX9gdiOXmQm40GLaivf64rI8l3mybsXrvLg/IW', 1);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (19, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Green apple.svg', '4444444444444', '$2a$10$WkoBgbBlKbY4u7RejGSEVO82pArw5CRD72e2eSXLSxrNhjn5/BtD.', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (22, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Green apple.svg', 'str33333ing', '$2a$10$vb/hnt2yUVLdx8kdkT29kO7QL/ISqQ5mExv32c2lykCmPIdGa/Gr.', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (23, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Clown face.svg', 'test10', '$2a$10$UwoOwixTqOJen8C48Jn9HOu8Y30dbasU9vVw0kcyKTCMVdxKR0TJS', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (26, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/tom48.svg', 'eorat3', '$2a$10$DXkNsHKOYXWNejyValBSyu5wff69If.vQyoFDZU96EWTHFE1QMth.', 1);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (27, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Green apple.svg', 'string222222222d22', '$2a$10$iiRJ2MOrd7YIDQLGtb2YS.D/tBHvpbZh4AUqBlPsK7i.IyPPtDnPy', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (28, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Green apple.svg', 'string2222', '$2a$10$cEn8Qnbbz22vn/ok1mUo4OG1k/GRzM6MR5U0mFaLJtLVmOJIf8VwW', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (30, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-카와이이-96.png', 'test44', '$2a$10$JVj4KX88XQ9SaaQmIiGz9ekyO42RsbbRBzkHwlS8yDcqp3qmdY96O', 1);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (31, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Face blowing a kiss.svg', 'test55', '$2a$10$GaxhkJdtFnQRz0M.bOrJReuMDQmOflO1Az2vo59Fqct0QOs8OH8lu', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (32, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-teddy-bear-96.png', 'eora21', '$2a$10$SkzjbXN.16JOWJR5XxKn/O1ANv/9oSWRsoDOko3QSfDNQjPHdKFOi', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (33, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Face blowing a kiss.svg', 'wheeee', '$2a$10$F9nJYqpTVN7KPGdMFq4JP.R.at4nOeKUuriFRSvhUJraHhXPMT4RO', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (34, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Clown face.svg', 'testrr', '$2a$10$Sl.Apfha3kv3k7WPiLXRi.AwO4FjVYOxhYovY9K5o0xPD4Id/yDhi', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (35, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Face blowing a kiss.svg', 'testkk', '$2a$10$IrSbvizICXlfCSVVJ.OGlexTQ.WarE5sygukGliPWPvyF.tUicH0C', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (36, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Cat.svg', 'testryu', '$2a$10$B4x5DwqC.6drsaIyHxv71u1zH1Cex471pZDTvI4T6ZH397yA.VTIq', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (37, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Face blowing a kiss.svg', 'rud17rude', '$2a$10$lrEL1m9DQoUGIaf0J80x9./G08KFslHRv/BynkX.GTKiGsTD09mi2', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (38, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Face blowing a kiss.svg', 'rosel03', '$2a$10$jHjfSIZ4jD6lnm.PPn/FY.YfXX9vUSO1our3eVi3FpQd.XDOMGr5G', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (39, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Dog.svg', 'wjpark1074', '$2a$10$o4F1SV8iPf6E5lmqn68upeI8yB/PCRL0Gic/fWJ3qX3wGgoT8savq', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (40, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Face blowing a kiss.svg', 'more1028', '$2a$10$SJe0QNfiukl91bIBCcpWZ.cZDBztnd8K5FYW4DqFLbKGa2I42Keo6', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (41, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Face blowing a kiss.svg', 'herkwak', '$2a$10$nX4PNOe8Y2Ki0Z/bxGlNnu3gWLzgOliHv5IByBv7Kou83.FqEmdj.', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (42, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-front-facing-baby-chick-96.png', 'skymusic7', '$2a$10$GXUNbMyEdZHpjIJMPgUW6uuRhcr3XaH5q7Ixajt4rhW.2gNNu1G3K', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (43, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/tom48.svg', 'rangil2', '$2a$10$/FORmJ8kR2zeP898ccrbHeRrKRDzTYIyN8lTgVtwWBp53B60xQ/CK', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (44, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-whale.svg', 'sky0924', '$2a$10$SET/HAdZBYXk04EFp.YoPOdhfP/FU9q1/P57dUWfUleJSHL7rascG', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (45, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Cat.svg', 'codnjs226', '$2a$10$lUtXUV1DD1fZqPrrOyl0P.JcafExn86aagBcFjWS4I7//tnsV2Ige', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (46, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Peach.svg', 'zeeone', '$2a$10$5FzgKQcVdC7nxeU5AOakSOg7Yk/h79jG.LAOZJwyWOun4EarXb8wq', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (47, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Face blowing a kiss.svg', 'chlwogur70', '$2a$10$hvaxCylW6M2wkm88Onduu./Tl8GveDCSVuILnEJ5K0MN.ghvol.pO', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (48, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Face blowing a kiss.svg', 'kjh020922', '$2a$10$JIH2.FjOXccSbcrNoEnLeufnNv40ocC1d9eGzePal0loDACycuzPm', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (49, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Face blowing a kiss.svg', 'minhyuk2', '$2a$10$lgUdUiO.l/Qzfo8sw2VxuOdRV.7O8bD1S4wBFnLFaCAyr4XLPyO26', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (50, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Green apple.svg', '246801', '$2a$10$H1WvRnDTodki0bRwpwVrUOcp9XosJn7bty.5N0Pbt9NQxdyxSMPI2', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (51, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Face blowing a kiss.svg', 'hangrace04', '$2a$10$Jy.w6Fm9XspjcnKlmQKkBuvwtpGriiAeeGl4Fesn8M6lJhl1meHLy', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (52, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Dog.svg', 'tpgh0826', '$2a$10$nfgxyaQNQMs.B1Bbyh6zWurvmqQHUty3S/C94GE021AYGniBt/fDe', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (53, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-four-leaf-clover.svg', 'psalms123', '$2a$10$S63f/uyExQMALRzTzAOZJuNmh6aeb6SKW.uv5lmNceF4N4TSoRzkq', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (54, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Face blowing a kiss.svg', 'eucliwood32', '$2a$10$Ye0srA5SaxkMW0e.1SQt6O79kKPD82v6l/YXKwK8VVnLX6fX0W9KK', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (55, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Astonished face.svg', 'auj2465', '$2a$10$2ZlVpMiZK9z51x1alUOgZOQ/iK5RZ6lYvK9QMYXWfHNh375J1diP2', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (56, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Face blowing a kiss.svg', '102677', '$2a$10$CQEckScmedfVFsae2/rLC.RVDiuuts8L/Ed.J08Mi2BLArPqSdt8i', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (57, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Cat.svg', 'leeeee', '$2a$10$fZ/z9BtyInm1uLyNygXtCu3L8z8myMTR0PMk0Q8FUdN7XiHO6YwEa', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (58, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-seal.svg', 'whatisthis', '$2a$10$NFqjNm7e/mFSJSz9mPJ0ZuKG99cx.X2wC5HF9JNWYoNvj3RqpyyrC', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (59, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-four-leaf-clover.svg', 'highc1rc1e', '$2a$10$.pF79/PjVmx6i8XSnuI5Me1HOyYifO96WJBXyvv9NUVR2pfJwtE6G', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (60, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Green apple.svg', 'victoryrain0319', '$2a$10$qxbEWnvo0nGwzLwjFjagHeT8TJqmwQv40pPD8nOBLvEgj2jhb.z32', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (61, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-otter-96.png', 'ddoo1244', '$2a$10$n2Y24ENEHDaQv9ZtS3icgud6wrOaLalaJnzKcir.S2buJ.3bf/Gzy', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (62, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-maple-leaf.svg', 'song2021', '$2a$10$fOtw.zJLSNIHpA3hKs9qEOrF0q/7rcoGp1Wjwk/Halhk5JIUSVI8i', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (63, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Face blowing a kiss.svg', 'q2021p', '$2a$10$9DBntjT6hE0MpMR1ZorDXePgLoWDkBgN552F9izkjCv/M8yBCbdlW', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (64, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/uzumaki48.svg', 'gkuer', '$2a$10$8.arNOzEHz23DZXml/J2quu6bodLzX5SnNaAZ275uKtFkNxMy323m', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (65, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Astonished face.svg', 'poppyh', '$2a$10$FC40ht7EK3MrowM71NFhFO/K0RynPFbaP.RUGvoVJc7Y0Wg0tWZUC', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (66, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Astonished face.svg', 'poppy1', '$2a$10$jpfDMcKt1Xvmr6t7iu7d6edC5/pzEGh0RPyaUNS30NhRAIBG3gYfi', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (67, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-포켓몬-96.png', 'kmh1', '$2a$10$V5oUoMqJ5sEYL9xEqzTlSeUafTj7znZPzhFCWCHeEBhu3WCuAg5oG', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (68, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/itachiuchiha48.svg', '13579', '$2a$10$7aPitH.YtVySTGHgtluK..WdTH0/9k0UxzhLX4UTxeOwP7bRJO/Cy', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (69, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Face blowing a kiss.svg', 'johnsmith', '$2a$10$Qo4P4EVLByIQO4KErJ.5aeVSbz04f.pJ6jOoc2b82znZh6pimOdCq', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (70, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/icons8-펭귄.svg', 'test1234', '$2a$10$sFnlJ9ecPQ2UCX6hzPWkTOompif0FC4JBq.VICPy5ws4wdEwkOLVW', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (71, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Fire.svg', 'test123', '$2a$10$Dy2V4ByCicnu9eykNO4GEORgxqjZvEIXiNXOo0YvNy2jbvJQPjxGO', 1);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (72, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Fire.svg', 'test1212', '$2a$10$bR/6egwCHGdY5lcdqC8iHOwkngGSaaZDv.k5Om0xBjXEIOOqqEsD6', 1);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (73, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Fire.svg', 'test111', '$2a$10$tGTxHQH16fbKO0SG8Yr8POItM2W6iSeA3DKVwtoP7iT/Ic.Ml/yGW', 1);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (74, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Face blowing a kiss.svg', 'eeee', '$2a$10$7a4DqG4Rd11fNfXrmWogLOh2RlxgfIHYvI6JBWrv.iaZ9fip2gKae', 1);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (75, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Face blowing a kiss.svg', 'test555', '$2a$10$/1a8AE.ZJz.Cva7OqYTYyOAL6kWq/RvQjULKhkNQBzDKcCDX9eQda', 0);
INSERT INTO joalarm.accounts (account_seq, emoji, id, password, report_cnt) VALUES (76, 'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Cat.svg', 'user1', '$2a$10$tNBuqAyv/Mtk8O4rWRrgNu6FX5vrd5a7ejYdmZqLbH5umuV1IdULK', 0);


INSERT INTO joalarm.contacts (contact_seq, content, type) VALUES (14, '유저가 많이 있으면 정말 좋은 서비스가 될 것 같아요!', 'review');
INSERT INTO joalarm.contacts (contact_seq, content, type) VALUES (15, '재밌어요', 'review');
INSERT INTO joalarm.contacts (contact_seq, content, type) VALUES (16, 'ㅎㅎㅎㅎㅎㅎ', 'inquiry');
