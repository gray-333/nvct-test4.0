// 60道测试题目数据
const questions = [
    // 维度1：观察(O) vs 评论(C) - 15题
    {
        id: 1,
        dimension: "观察(O) vs 评论(C)",
        text: "【情境】朋友迟到20分钟赶到咖啡厅",
        options: [
            { text: "\"你比约定时间晚了20分钟呢\"", value: "O", time: 0 },
            { text: "\"你也太不准时了吧，还以为被放了呢\"", value: "C", time: 0 }
        ]
    },
    {
        id: 2,
        dimension: "观察(O) vs 评论(C)",
        text: "【撒娇风格】看到男友（女友）乱扔袜子",
        options: [
            { text: "\"宝贝，地板上有一双你的灰色袜子哦～\"", value: "O", time: 0 },
            { text: "\"你这人真是邋遢鬼\"", value: "C", time: 0 }
        ]
    },
    {
        id: 3,
        dimension: "观察(O) vs 评论(C)",
        text: "【幽默语气】同事讲了个冷笑话",
        options: [
            { text: "\"刚才那个笑话里提到了三只企鹅和一台冰箱\"", value: "O", time: 0 },
            { text: "\"你的笑话也太冷了吧\"", value: "C", time: 0 }
        ]
    },
    {
        id: 4,
        dimension: "观察(O) vs 评论(C)",
        text: "【感性表达】看到夕阳很美",
        options: [
            { text: "\"现在的天空是橙红色，云层很薄\"", value: "O", time: 0 },
            { text: "\"这景色美得让人心碎\"", value: "C", time: 0 }
        ]
    },
    {
        id: 5,
        dimension: "观察(O) vs 评论(C)",
        text: "当别人说：\"这份报告已经延迟三天提交了\"",
        options: [
            { text: "觉得TA很严谨", value: "O", time: 0 },
            { text: "觉得TA有点啰嗦", value: "C", time: 0 }
        ]
    },
    {
        id: 6,
        dimension: "观察(O) vs 评论(C)",
        text: "【情境】孩子考试得了70分",
        options: [
            { text: "\"你这次数学卷子选择题错了4道\"", value: "O", time: 0 },
            { text: "\"你数学就是不行，多练\"", value: "C", time: 0 }
        ]
    },
    {
        id: 7,
        dimension: "观察(O) vs 评论(C)",
        text: "【撒娇】想提醒伴侣纪念日",
        options: [
            { text: "\"今天是5月20号呢，亲爱的记得是什么日子吗？\"", value: "O", time: 0 },
            { text: "\"你肯定又忘了重要的日子\"", value: "C", time: 0 }
        ]
    },
    {
        id: 8,
        dimension: "观察(O) vs 评论(C)",
        text: "当别人说：\"你的口红颜色今天格外鲜艳\"",
        options: [
            { text: "觉得TA观察好仔细", value: "O", time: 0 },
            { text: "觉得TA在评价我妆容，是好事还是坏事呢……?", value: "C", time: 0 }
        ]
    },
    {
        id: 9,
        dimension: "观察(O) vs 评论(C)",
        text: "【幽默】朋友吃相豪放",
        options: [
            { text: "\"你刚才一口吃了半个汉堡\"", value: "O", time: 0 },
            { text: "\"你吃饭像饿了三天的样子\"", value: "C", time: 0 }
        ]
    },
    {
        id: 10,
        dimension: "观察(O) vs 评论(C)",
        text: "【情境】会议超时30分钟",
        options: [
            { text: "\"原定1小时的会议现在进行了90分钟\"", value: "O", time: 0 },
            { text: "\"这会开得太拖拉了\"", value: "C", time: 0 }
        ]
    },
    {
        id: 11,
        dimension: "观察(O) vs 评论(C)",
        text: "当别人说：\"你最近换了新发型\"",
        options: [
            { text: "觉得TA很关注我", value: "O", time: 0 },
            { text: "觉得TA在judge我的发型", value: "C", time: 0 }
        ]
    },
    {
        id: 12,
        dimension: "观察(O) vs 评论(C)",
        text: "【感性】描述刚看完的电影",
        options: [
            { text: "\"电影里主角哭了三次，都是在雨天场景\"", value: "O", time: 0 },
            { text: "\"这部电影太感人了\"", value: "C", time: 0 }
        ]
    },
    {
        id: 13,
        dimension: "观察(O) vs 评论(C)",
        text: "【撒娇】提醒妈妈天冷加衣",
        options: [
            { text: "\"妈妈，天气预报说今天最低8度哦～\"", value: "O", time: 0 },
            { text: "\"你怎么总不知道多穿点，这样会冻到的\"", value: "C", time: 0 }
        ]
    },
    {
        id: 14,
        dimension: "观察(O) vs 评论(C)",
        text: "【情境】外卖送晚了",
        options: [
            { text: "\"订单显示预计30分钟送达，实际用了50分钟\"", value: "O", time: 0 },
            { text: "\"这外卖也太慢了\"", value: "C", time: 0 }
        ]
    },
    {
        id: 15,
        dimension: "观察(O) vs 评论(C)",
        text: "当别人说：\"你说话时会不自觉地摸耳垂\"",
        options: [
            { text: "觉得TA好细心可爱", value: "O", time: 0 },
            { text: "觉得TA在挑我毛病", value: "C", time: 0 }
        ]
    },

    // 维度2：感受(F) vs 想法(T) - 15题
    {
        id: 16,
        dimension: "感受(F) vs 想法(T)",
        text: "【撒娇】想要拥抱时",
        options: [
            { text: "\"唔…现在好想被你抱抱，感觉会暖暖的\"", value: "F", time: 0 },
            { text: "\"来抱我一下呗，我渴望爱的抱抱～\"", value: "T", time: 0 }
        ]
    },
    {
        id: 17,
        dimension: "感受(F) vs 想法(T)",
        text: "【幽默】被朋友放鸽子",
        options: [
            { text: "\"被放鸽子感觉像被风吹走的塑料袋，有点飘零感哈哈\"", value: "F", time: 0 },
            { text: "\"我认为你该提前通知我\"", value: "T", time: 0 }
        ]
    },
    {
        id: 18,
        dimension: "感受(F) vs 想法(T)",
        text: "【感性】听悲伤的音乐时",
        options: [
            { text: "\"这段旋律让我心里泛起淡淡的忧伤\"", value: "F", time: 0 },
            { text: "\"这音乐传达的是失去的主题，听上去很伤感\"", value: "T", time: 0 }
        ]
    },
    {
        id: 19,
        dimension: "感受(F) vs 想法(T)",
        text: "【情境】收到不喜欢的礼物",
        options: [
            { text: "\"收到这个让我感到有点为难\"", value: "F", time: 0 },
            { text: "\"这礼物不适合我啊，但我收下啦\"", value: "T", time: 0 }
        ]
    },
    {
        id: 20,
        dimension: "感受(F) vs 想法(T)",
        text: "当别人说：\"和你聊天时我感到很轻松\"",
        options: [
            { text: "觉得TA好真诚温暖", value: "F", time: 0 },
            { text: "觉得TA在表达观点", value: "T", time: 0 }
        ]
    },
    {
        id: 21,
        dimension: "感受(F) vs 想法(T)",
        text: "【撒娇】工作累了时",
        options: [
            { text: "\"今天加班到现在，感觉能量槽已经空了呢～\"", value: "F", time: 0 },
            { text: "\"累死了，该休息了，快毁灭吧\"", value: "T", time: 0 }
        ]
    },
    {
        id: 22,
        dimension: "感受(F) vs 想法(T)",
        text: "【幽默】被开玩笑后",
        options: [
            { text: "\"你刚才那句玩笑让我心脏抖了一下哦\"", value: "F", time: 0 },
            { text: "\"你开的玩笑有点过分\"", value: "T", time: 0 }
        ]
    },
    {
        id: 23,
        dimension: "感受(F) vs 想法(T)",
        text: "当别人说：\"看到你成功我真心为你高兴\"",
        options: [
            { text: "觉得TA情感好真挚", value: "F", time: 0 },
            { text: "觉得TA在表达看法", value: "T", time: 0 }
        ]
    },
    {
        id: 24,
        dimension: "感受(F) vs 想法(T)",
        text: "【感性】告别时",
        options: [
            { text: "\"要分开让我感到一阵不舍\"", value: "F", time: 0 },
            { text: "\"我们应该保持联系\"", value: "T", time: 0 }
        ]
    },
    {
        id: 25,
        dimension: "感受(F) vs 想法(T)",
        text: "【情境】被批评工作",
        options: [
            { text: "\"听到这些反馈我感到有些挫败\"", value: "F", time: 0 },
            { text: "\"这个批评不合理\"", value: "T", time: 0 }
        ]
    },
    {
        id: 26,
        dimension: "感受(F) vs 想法(T)",
        text: "【撒娇】想让男友陪逛街",
        options: [
            { text: "\"如果你陪我逛街，我会感到超开心像中奖一样\"", value: "F", time: 0 },
            { text: "\"你应该多陪我逛逛街，作为回报，我给你做好吃的～\"", value: "T", time: 0 }
        ]
    },
    {
        id: 27,
        dimension: "感受(F) vs 想法(T)",
        text: "当别人说：\"这个决定让我内心很矛盾\"",
        options: [
            { text: "觉得TA在坦诚分享内心", value: "F", time: 0 },
            { text: "觉得TA在分析情况", value: "T", time: 0 }
        ]
    },
    {
        id: 28,
        dimension: "感受(F) vs 想法(T)",
        text: "【幽默】等待重要通知时",
        options: [
            { text: "\"等待结果感觉像在等彩票开奖，心跳加速中\"", value: "F", time: 0 },
            { text: "\"我觉得结果应该快出来了，嗯……\"", value: "T", time: 0 }
        ]
    },
    {
        id: 29,
        dimension: "感受(F) vs 想法(T)",
        text: "【情境】听到好消息",
        options: [
            { text: "\"听到这个我兴奋得想转圈圈\"", value: "F", time: 0 },
            { text: "\"这是个好消息\"", value: "T", time: 0 }
        ]
    },
    {
        id: 30,
        dimension: "感受(F) vs 想法(T)",
        text: "当别人说：\"你的陪伴让我感到安心\"",
        options: [
            { text: "觉得TA在表达真实情感", value: "F", time: 0 },
            { text: "觉得TA在陈述事实", value: "T", time: 0 }
        ]
    },

    // 维度3：需要(N) vs 指责(B) - 15题
    {
        id: 31,
        dimension: "需要(N) vs 指责(B)",
        text: "【撒娇】想要独处时",
        options: [
            { text: "\"今天小兔子需要一点自己的洞穴时间呢～\"", value: "N", time: 0 },
            { text: "\"你太黏人了\"", value: "B", time: 0 }
        ]
    },
    {
        id: 32,
        dimension: "需要(N) vs 指责(B)",
        text: "【幽默】被不停追问时",
        options: [
            { text: "\"我现在需要一点'拒不回答'的权利\"", value: "N", time: 0 },
            { text: "\"你问题太多了，给你嘴巴塞个苹果\"", value: "B", time: 0 }
        ]
    },
    {
        id: 33,
        dimension: "需要(N) vs 指责(B)",
        text: "【感性】感到孤独时",
        options: [
            { text: "\"此刻我渴望心灵的共鸣与连接\"", value: "N", time: 0 },
            { text: "\"没人理解我\"", value: "B", time: 0 }
        ]
    },
    {
        id: 34,
        dimension: "需要(N) vs 指责(B)",
        text: "【情境】伴侣忘记重要事情",
        options: [
            { text: "\"我需要感受到被特别记得\"", value: "N", time: 0 },
            { text: "\"你根本不在乎我\"", value: "B", time: 0 }
        ]
    },
    {
        id: 35,
        dimension: "需要(N) vs 指责(B)",
        text: "当别人说：\"我现在需要一些安静的时间\"",
        options: [
            { text: "觉得TA懂得自我照顾", value: "N", time: 0 },
            { text: "觉得TA在排斥我", value: "B", time: 0 }
        ]
    },
    {
        id: 36,
        dimension: "需要(N) vs 指责(B)",
        text: "【撒娇】想让对方改习惯",
        options: [
            { text: "\"宝宝需要你少抽点烟，因为想和你一起变老呀\"", value: "N", time: 0 },
            { text: "\"你抽烟烦死了\"", value: "B", time: 0 }
        ]
    },
    {
        id: 37,
        dimension: "需要(N) vs 指责(B)",
        text: "【幽默】朋友总打断说话",
        options: [
            { text: "\"亲爱的，我的发言权需要一点'免打断保险'哈哈哈\"", value: "N", time: 0 },
            { text: "\"你老打断我\"", value: "B", time: 0 }
        ]
    },
    {
        id: 38,
        dimension: "需要(N) vs 指责(B)",
        text: "当别人说：\"这不是你的错，是我需要被理解\"",
        options: [
            { text: "觉得TA很有担当", value: "N", time: 0 },
            { text: "觉得TA在绕弯子指责", value: "B", time: 0 }
        ]
    },
    {
        id: 39,
        dimension: "需要(N) vs 指责(B)",
        text: "【感性】不被倾听时",
        options: [
            { text: "\"我的灵魂渴望被听见、被真正理解\"", value: "N", time: 0 },
            { text: "\"你们都只听自己说话\"", value: "B", time: 0 }
        ]
    },
    {
        id: 40,
        dimension: "需要(N) vs 指责(B)",
        text: "【情境】工作负担过重",
        options: [
            { text: "\"我需要合理的工作量分配\"", value: "N", time: 0 },
            { text: "\"你们把活都推给我\"", value: "B", time: 0 }
        ]
    },
    {
        id: 41,
        dimension: "需要(N) vs 指责(B)",
        text: "【撒娇】想要惊喜时",
        options: [
            { text: "\"小公主偶尔需要一点魔法惊喜啦～\"", value: "N", time: 0 },
            { text: "\"你从来不懂浪漫\"", value: "B", time: 0 }
        ]
    },
    {
        id: 42,
        dimension: "需要(N) vs 指责(B)",
        text: "当别人说：\"我不是怪你，是我需要更多安全感\"",
        options: [
            { text: "觉得TA很成熟", value: "N", time: 0 },
            { text: "觉得TA还是在怪我", value: "B", time: 0 }
        ]
    },
    {
        id: 43,
        dimension: "需要(N) vs 指责(B)",
        text: "【幽默】被过度关心时",
        options: [
            { text: "\"报告长官，士兵目前需要一点'自由放风'时间！\"", value: "N", time: 0 },
            { text: "\"你别管我了\"", value: "B", time: 0 }
        ]
    },
    {
        id: 44,
        dimension: "需要(N) vs 指责(B)",
        text: "【感性】创作遇到瓶颈",
        options: [
            { text: "\"我的灵感需要滋养和空间\"", value: "N", time: 0 },
            { text: "\"什么都创作不出来\"", value: "B", time: 0 }
        ]
    },
    {
        id: 45,
        dimension: "需要(N) vs 指责(B)",
        text: "当别人说：\"我需要一点时间整理思绪\"",
        options: [
            { text: "觉得TA很理智", value: "N", time: 0 },
            { text: "觉得TA在逃避问题", value: "B", time: 0 }
        ]
    },

    // 维度4：请求(R) vs 要求(D) - 15题
    {
        id: 46,
        dimension: "请求(R) vs 要求(D)",
        text: "【撒娇】想让对方做饭",
        options: [
            { text: "\"今天小肚子想吃你做的蛋包饭，可以嘛～\"", value: "R", time: 0 },
            { text: "\"快去做饭，饿ing\"", value: "D", time: 0 }
        ]
    },
    {
        id: 47,
        dimension: "请求(R) vs 要求(D)",
        text: "【幽默】需要帮忙搬东西",
        options: [
            { text: "\"这位壮士，可否助小女子一臂之力？有偿回报一个微笑！\"", value: "R", time: 0 },
            { text: "\"过来帮我搬……沉死人了……\"", value: "D", time: 0 }
        ]
    },
    {
        id: 48,
        dimension: "请求(R) vs 要求(D)",
        text: "【感性】希望深入交流",
        options: [
            { text: "\"你是否愿意和我分享你心底的星辰大海？\"", value: "R", time: 0 },
            { text: "\"你我敞开心扉，坦诚相待吧\"", value: "D", time: 0 }
        ]
    },
    {
        id: 49,
        dimension: "请求(R) vs 要求(D)",
        text: "【情境】希望调整会议时间",
        options: [
            { text: "\"我们是否可以改到下午三点？\"", value: "R", time: 0 },
            { text: "\"我没空，还是改到下午三点吧\"", value: "D", time: 0 }
        ]
    },
    {
        id: 50,
        dimension: "请求(R) vs 要求(D)",
        text: "当别人说：\"宝贝，可以帮我倒杯水吗？\"",
        options: [
            { text: "觉得TA很可爱有礼貌", value: "R", time: 0 },
            { text: "觉得TA在使唤我", value: "D", time: 0 }
        ]
    },
    {
        id: 51,
        dimension: "请求(R) vs 要求(D)",
        text: "【撒娇】想让伴侣早睡",
        options: [
            { text: "\"王子殿下，臣妾请求您就寝，可以吗？\"", value: "R", time: 0 },
            { text: "\"快去睡觉啦宝\"", value: "D", time: 0 }
        ]
    },
    {
        id: 52,
        dimension: "请求(R) vs 要求(D)",
        text: "【幽默】催朋友回复消息",
        options: [
            { text: "\"地球呼叫火星人，收到请回复，over～\"", value: "R", time: 0 },
            { text: "\"快点回我消息，你s哪去了?无语ing\"", value: "D", time: 0 }
        ]
    },
    {
        id: 53,
        dimension: "请求(R) vs 要求(D)",
        text: "当别人说：\"如果你方便的话，能听听我的想法吗？\"",
        options: [
            { text: "觉得TA很尊重人", value: "R", time: 0 },
            { text: "觉得TA太客气了", value: "D", time: 0 }
        ]
    },
    {
        id: 54,
        dimension: "请求(R) vs 要求(D)",
        text: "【感性】请求原谅时",
        options: [
            { text: "\"你愿意给我一个重新开始的机会吗？\"", value: "R", time: 0 },
            { text: "\"原谅我，再给我点耐心\"", value: "D", time: 0 }
        ]
    },
    {
        id: 55,
        dimension: "请求(R) vs 要求(D)",
        text: "【情境】希望团队合作",
        options: [
            { text: "\"大家是否愿意尝试这个协作方案？\"", value: "R", time: 0 },
            { text: "\"按这个方案执行可能好些\"", value: "D", time: 0 }
        ]
    },
    {
        id: 56,
        dimension: "请求(R) vs 要求(D)",
        text: "【撒娇】想约会时",
        options: [
            { text: "\"好喜欢你，能和你一起去共进午餐吗?\"", value: "R", time: 0 },
            { text: "\"周末出来约会吧，咖啡馆等你～\"", value: "D", time: 0 }
        ]
    },
    {
        id: 57,
        dimension: "请求(R) vs 要求(D)",
        text: "【幽默】提醒还钱",
        options: [
            { text: "\"亲爱的债主提醒：您有一笔'友谊贷款'到期咯，考虑续期还是还款？\"", value: "R", time: 0 },
            { text: "\"还钱，快还钱，啊啊啊啊啊……\"", value: "D", time: 0 }
        ]
    },
    {
        id: 58,
        dimension: "请求(R) vs 要求(D)",
        text: "当别人说：\"这只是我的请求，你可以拒绝\"",
        options: [
            { text: "觉得TA很体贴", value: "R", time: 0 },
            { text: "觉得TA不够坚定", value: "D", time: 0 }
        ]
    },
    {
        id: 59,
        dimension: "请求(R) vs 要求(D)",
        text: "【感性】请求支持时",
        options: [
            { text: "\"在我迷茫时，你愿意做我的灯塔吗？\"", value: "R", time: 0 },
            { text: "\"你对我最好了，你要支持我\"", value: "D", time: 0 }
        ]
    },
    {
        id: 60,
        dimension: "请求(R) vs 要求(D)",
        text: "当别人说：\"请帮帮我，但不要有压力\"",
        options: [
            { text: "觉得TA很温柔", value: "R", time: 0 },
            { text: "觉得TA好肉麻", value: "D", time: 0 }
        ]
    }
];
