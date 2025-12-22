import { useMemo } from 'react';

/**
 * RollingComments component
 * Displays fake user praises scrolling from bottom to top infinitely.
 * Generates 20 random comments per session.
 */
const RollingComments = () => {
    // Generate random masked phone number
    const generatePhone = () => {
        const prefixes = ['138', '139', '158', '159', '188', '189', '135', '136', '137', '186'];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
        return `${prefix}****${suffix}`;
    };

    // Pool of praise messages
    const praises = [
        '背了100个单词！',
        '连续打卡7天！',
        '今天又进步了！',
        '单词王者太好用了！',
        '终于记住这些单词了！',
        '考试成绩提高了20分！',
        '推荐给同学们！',
        '每天10分钟，进步看得见！',
        '比其他软件好用多了！',
        '孩子现在爱学英语了！',
        '背单词原来可以这么有趣！',
        '记忆力变好了！',
        '老师都夸我进步大！',
        '期末考试满分！',
        '坚持就是胜利！',
        '单词王者，yyds！',
        '从不及格到优秀！',
        '英语课终于听懂了！',
        '妈妈再也不担心我的英语了！',
        '学习效率翻倍！',
        '词汇量暴增！',
        '今天背了50个新单词！',
        '打卡第30天！',
        '又掌握了一个单元！'
    ];

    // Generate 20 random comments (memoized per render)
    const comments = useMemo(() => {
        const shuffled = [...praises].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 20).map((praise, index) => ({
            id: index,
            phone: generatePhone(),
            message: praise
        }));
    }, []);

    return (
        <div className="rolling-comments-container">
            <div className="rolling-comments-track">
                {/* Double the comments for seamless loop */}
                {[...comments, ...comments].map((comment, index) => (
                    <div key={index} className="rolling-comment-item">
                        <span className="comment-phone">{comment.phone}</span>
                        <span className="comment-message">{comment.message}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RollingComments;
