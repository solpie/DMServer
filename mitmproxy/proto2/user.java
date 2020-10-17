package com.bytedance.android.live.base.model.user;

import android.text.TextUtils;
import com.bytedance.android.live.base.model.Extra;
import com.bytedance.android.live.base.model.FansClubMember;
import com.bytedance.android.live.base.model.ImageModel;
import com.bytedance.android.live.base.model.vip.UserVipInfo;
import com.bytedance.common.utility.Lists;
import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;
import com.meituan.robust.ChangeQuickRedirect;
import com.meituan.robust.PatchProxy;
import com.meituan.robust.PatchProxyResult;
import java.util.ArrayList;
import java.util.List;

public class User implements j {
    public static ChangeQuickRedirect changeQuickRedirect;
    @SerializedName("adversary_authorization_info")
    int adversaryAuthorizationInfo;
    @SerializedName("adversary_user_status")
    public int adversaryUserStatus;
    @SerializedName("anchor_info")
    b anchorInfo;
    @SerializedName("webcast_anchor_level")
    c anchorLevel;
    @SerializedName("author_stats")
    d authorInfo;
    @SerializedName("authorization_info")
    int authorizationInfo;
    @SerializedName("avatar_border")
    ImageModel avatarBorder;
    @SerializedName("avatar_large")
    ImageModel avatarLarge;
    @SerializedName("avatar_medium")
    ImageModel avatarMedium;
    @SerializedName("avatar_thumb")
    ImageModel avatarThumb;
    @SerializedName("avatar_url")
    String avatarUrl;
    @SerializedName("bg_img_url")
    String backgroundImgUrl;
    @SerializedName("badge_image_list")
    List<ImageModel> badgeImageList;
    @SerializedName("birthday")
    long birthday;
    @SerializedName("border")
    e border;
    @SerializedName("city")
    String city;
    @SerializedName("commerce_webcast_config_ids")
    public List<Long> commerceConfigIds;
    int commerceUserLevel;
    @SerializedName("create_time")
    long createTime;
    @SerializedName("display_id")
    public String displayId;
    @SerializedName("with_car_management_permission")
    boolean enableCarManagementPermission;
    @SerializedName("with_commerce_permission")
    boolean enableShowCommerceSale;
    @SerializedName("encrypted_id")
    String encryptedId = "";
    int enterprise;
    @SerializedName("experience")
    int experience;
    @SerializedName("ticket_count")
    long fanTicketCount;
    @SerializedName("fans_club")
    FansClubMember fansClub;
    @SerializedName("follow_info")
    FollowInfo followInfo;
    @SerializedName("brotherhood_info")
    FraternityInfo fraternityInfo;
    @SerializedName("gender")
    int gender;
    @SerializedName("id")
    long id;
    @SerializedName("id_str")
    String idStr;
    @SerializedName("income_share_percent")
    int incomeSharePercent;
    @SerializedName("verified")
    boolean isVerified;
    @SerializedName("level")
    int level;
    @SerializedName("link_mic_stats")
    int linkMicStats;
    private String logPb;
    @SerializedName("authentication_info")
    public AuthenticationInfo mAuthenticationInfo;
    private String mAvatarLargeStr;
    private String mAvatarMediumStr;
    private String mAvatarThumbStr;
    @SerializedName("medal")
    ImageModel medal;
    @SerializedName("media_badge_image_list")
    public List<ImageModel> mediaBadgeImageList;
    @SerializedName("modify_time")
    long modifyTime;
    transient boolean neverRecharge;
    @SerializedName("new_real_time_icons")
    List<ImageModel> newUserBadges;
    @SerializedName("nickname")
    String nickName;
    @SerializedName("noble_info")
    NobleLevelInfo nobleLevelInfo;
    @SerializedName("own_room")
    a ownRoom;
    @SerializedName("total_recharge_diamond_count")
    long payScores = -1;
    @SerializedName("personal_card")
    ImageModel personalCard;
    @SerializedName("poi_info")
    PoiInfo poiInfo;
    private String requestId;
    @SerializedName("activity_reward")
    a rewardInfo;
    @SerializedName("room_auto_gift_thanks")
    boolean roomAutoGiftThanks;
    @SerializedName("sec_uid")
    String secUid;
    @SerializedName("secret")
    int secret;
    @SerializedName("share_qrcode_uri")
    String shareQrcodeUri;
    @SerializedName("short_id")
    long shortId;
    private boolean shouldUseRealName;
    @SerializedName("signature")
    String signature;
    @SerializedName("special_id")
    String specialId;
    @SerializedName("status")
    int status;
    @SerializedName("telephone")
    String telephone;
    @SerializedName("top_fans")
    List<User> topFans;
    @SerializedName("top_vip_no")
    int topVipNo;
    @SerializedName("user_attr")
    l userAttr;
    @SerializedName("real_time_icons")
    List<ImageModel> userBadges;
    @SerializedName("pay_grade")
    n userHonor;
    @SerializedName("user_role")
    int userRole;
    @SerializedName("user_vip_info")
    UserVipInfo userVipInfo;
    @SerializedName("verified_content")
    String verifiedContent;
    @SerializedName("verified_reason")
    String verifiedReason;
    @SerializedName("xigua_info")
    o xiguaUserParams;

    public static class a {

        /* renamed from: a  reason: collision with root package name */
        public static ChangeQuickRedirect f81034a;
        @SerializedName("room_ids")

        /* renamed from: b  reason: collision with root package name */
        public List<Long> f81035b;
        @SerializedName("room_ids_str")

        /* renamed from: c  reason: collision with root package name */
        public List<String> f81036c;
    }

    public static class b extends Extra {
        @SerializedName("anonymous_is_silence")

        /* renamed from: a  reason: collision with root package name */
        public boolean f81037a;
    }

    public boolean childrenManagerForbidCreateLiveRoom() {
        return false;
    }

    public boolean childrenManagerForbidWalletFunctions() {
        return false;
    }

    public b getAnchorInfo() {
        return this.anchorInfo;
    }

    public c getAnchorLevel() {
        return this.anchorLevel;
    }

    public d getAuthorInfo() {
        return this.authorInfo;
    }

    public ImageModel getAvatarBorder() {
        return this.avatarBorder;
    }

    public String getAvatarUrl() {
        return this.avatarUrl;
    }

    public String getBackgroundImgUrl() {
        return this.backgroundImgUrl;
    }

    public List<ImageModel> getBadgeImageList() {
        return this.badgeImageList;
    }

    public long getBirthday() {
        return this.birthday;
    }

    public e getBorder() {
        return this.border;
    }

    public String getCity() {
        return this.city;
    }

    public int getCommerceUserLevel() {
        return this.commerceUserLevel;
    }

    public long getCreateTime() {
        return this.createTime;
    }

    public String getDisplayId() {
        return this.displayId;
    }

    public String getEncryptedId() {
        return this.encryptedId;
    }

    public int getEnterprise() {
        return this.enterprise;
    }

    public int getExperience() {
        return this.experience;
    }

    public long getFanTicketCount() {
        return this.fanTicketCount;
    }

    public FansClubMember getFansClub() {
        return this.fansClub;
    }

    public FollowInfo getFollowInfo() {
        return this.followInfo;
    }

    public FraternityInfo getFraternityInfo() {
        return this.fraternityInfo;
    }

    public int getGender() {
        return this.gender;
    }

    public long getId() {
        return this.id;
    }

    public int getIncomeSharePercent() {
        return this.incomeSharePercent;
    }

    public int getLevel() {
        return this.level;
    }

    public int getLinkMicStats() {
        return this.linkMicStats;
    }

    public String getLogPb() {
        return this.logPb;
    }

    public ImageModel getMedal() {
        return this.medal;
    }

    public long getModifyTime() {
        return this.modifyTime;
    }

    public NobleLevelInfo getNobleLevelInfo() {
        return this.nobleLevelInfo;
    }

    public a getOwnRoom() {
        return this.ownRoom;
    }

    public long getPayScores() {
        return this.payScores;
    }

    public ImageModel getPersonalCard() {
        return this.personalCard;
    }

    public PoiInfo getPoiInfo() {
        return this.poiInfo;
    }

    public String getRealNickName() {
        return this.nickName;
    }

    public String getRequestId() {
        return this.requestId;
    }

    public a getRewardInfo() {
        return this.rewardInfo;
    }

    public boolean getRoomAutoGiftThanks() {
        return this.roomAutoGiftThanks;
    }

    public String getSecUid() {
        return this.secUid;
    }

    public int getSecret() {
        return this.secret;
    }

    public String getShareQrcodeUri() {
        return this.shareQrcodeUri;
    }

    public long getShortId() {
        return this.shortId;
    }

    public String getSignature() {
        return this.signature;
    }

    public String getSpecialId() {
        return this.specialId;
    }

    public int getStatus() {
        return this.status;
    }

    public String getTelephone() {
        return this.telephone;
    }

    public List<User> getTopFans() {
        return this.topFans;
    }

    public int getTopVipNo() {
        return this.topVipNo;
    }

    public l getUserAttr() {
        return this.userAttr;
    }

    public List<ImageModel> getUserBadges() {
        return this.userBadges;
    }

    public n getUserHonor() {
        return this.userHonor;
    }

    public int getUserRole() {
        return this.userRole;
    }

    public UserVipInfo getUserVipInfo() {
        return this.userVipInfo;
    }

    public String getVerifiedContent() {
        return this.verifiedContent;
    }

    public String getVerifiedReason() {
        return this.verifiedReason;
    }

    public o getXiguaUserParams() {
        return this.xiguaUserParams;
    }

    public boolean isEnableCarManagement() {
        return this.enableCarManagementPermission;
    }

    public boolean isEnableShowCommerceSale() {
        return this.enableShowCommerceSale;
    }

    public boolean isNeverRecharge() {
        return this.neverRecharge;
    }

    public boolean isShouldUseRealName() {
        return this.shouldUseRealName;
    }

    public boolean isVerified() {
        return this.isVerified;
    }

    public boolean isVcdAdversaryContentAuthorized() {
        if ((this.adversaryAuthorizationInfo & 1) > 0) {
            return true;
        }
        return false;
    }

    public boolean isVcdAdversaryRelationAuthorized() {
        if ((this.adversaryAuthorizationInfo & 2) > 0) {
            return true;
        }
        return false;
    }

    public boolean isVcdContentAuthorized() {
        if ((this.authorizationInfo & 1) > 0) {
            return true;
        }
        return false;
    }

    public boolean isVcdRelationAuthorized() {
        if ((this.authorizationInfo & 2) > 0) {
            return true;
        }
        return false;
    }

    public boolean isWithCommercePermission() {
        PatchProxyResult proxy = PatchProxy.proxy(new Object[0], this, changeQuickRedirect, false, 559);
        if (proxy.isSupported) {
            return ((Boolean) proxy.result).booleanValue();
        }
        return isEnableShowCommerceSale();
    }

    public ImageModel getAvatarLarge() {
        PatchProxyResult proxy = PatchProxy.proxy(new Object[0], this, changeQuickRedirect, false, 564);
        if (proxy.isSupported) {
            return (ImageModel) proxy.result;
        }
        try {
            if (this.avatarLarge == null && !TextUtils.isEmpty(this.mAvatarLargeStr)) {
                this.avatarLarge = (ImageModel) com.bytedance.android.live.a.a().fromJson(this.mAvatarLargeStr, ImageModel.class);
            }
        } catch (Exception unused) {
        }
        return this.avatarLarge;
    }

    public ImageModel getAvatarMedium() {
        PatchProxyResult proxy = PatchProxy.proxy(new Object[0], this, changeQuickRedirect, false, 552);
        if (proxy.isSupported) {
            return (ImageModel) proxy.result;
        }
        try {
            if (this.avatarMedium == null && !TextUtils.isEmpty(this.mAvatarMediumStr)) {
                this.avatarMedium = (ImageModel) com.bytedance.android.live.a.a().fromJson(this.mAvatarMediumStr, ImageModel.class);
            }
        } catch (Exception unused) {
        }
        return this.avatarMedium;
    }

    public ImageModel getAvatarThumb() {
        PatchProxyResult proxy = PatchProxy.proxy(new Object[0], this, changeQuickRedirect, false, 555);
        if (proxy.isSupported) {
            return (ImageModel) proxy.result;
        }
        try {
            if (this.avatarThumb == null && !TextUtils.isEmpty(this.mAvatarThumbStr)) {
                this.avatarThumb = (ImageModel) com.bytedance.android.live.a.a().fromJson(this.mAvatarThumbStr, ImageModel.class);
            }
        } catch (Exception unused) {
        }
        return this.avatarThumb;
    }

    public String getIdStr() {
        PatchProxyResult proxy = PatchProxy.proxy(new Object[0], this, changeQuickRedirect, false, 550);
        if (proxy.isSupported) {
            return (String) proxy.result;
        }
        if (TextUtils.isEmpty(this.idStr)) {
            return String.valueOf(this.id);
        }
        return this.idStr;
    }

    public List<ImageModel> getNewUserBadges() {
        PatchProxyResult proxy = PatchProxy.proxy(new Object[0], this, changeQuickRedirect, false, 562);
        if (proxy.isSupported) {
            return (List) proxy.result;
        }
        List<ImageModel> list = this.newUserBadges;
        if (list == null || list.isEmpty()) {
            return this.userBadges;
        }
        return this.newUserBadges;
    }

    public String getNickName() {
        PatchProxyResult proxy = PatchProxy.proxy(new Object[0], this, changeQuickRedirect, false, 558);
        if (proxy.isSupported) {
            return (String) proxy.result;
        }
        if (this.shouldUseRealName) {
            return this.nickName;
        }
        if (com.bytedance.android.live.base.c.b.b() == null || !com.bytedance.android.live.base.c.b.b().a()) {
            return this.nickName;
        }
        return com.bytedance.android.live.base.c.b.b().a(this);
    }

    public boolean isCustomVerify() {
        PatchProxyResult proxy = PatchProxy.proxy(new Object[0], this, changeQuickRedirect, false, 556);
        if (proxy.isSupported) {
            return ((Boolean) proxy.result).booleanValue();
        }
        AuthenticationInfo authenticationInfo = this.mAuthenticationInfo;
        if (authenticationInfo == null || TextUtils.isEmpty(authenticationInfo.customVerify)) {
            return false;
        }
        return true;
    }

    public boolean isEnterpriseVerify() {
        PatchProxyResult proxy = PatchProxy.proxy(new Object[0], this, changeQuickRedirect, false, 554);
        if (proxy.isSupported) {
            return ((Boolean) proxy.result).booleanValue();
        }
        AuthenticationInfo authenticationInfo = this.mAuthenticationInfo;
        if (authenticationInfo == null || TextUtils.isEmpty(authenticationInfo.enterpriseVerifyReason)) {
            return false;
        }
        return true;
    }

    public boolean isFollowing() {
        PatchProxyResult proxy = PatchProxy.proxy(new Object[0], this, changeQuickRedirect, false, 561);
        if (proxy.isSupported) {
            return ((Boolean) proxy.result).booleanValue();
        }
        FollowInfo followInfo2 = this.followInfo;
        if (followInfo2 == null) {
            return false;
        }
        if (followInfo2.getFollowStatus() == 2 || this.followInfo.getFollowStatus() == 1) {
            return true;
        }
        return false;
    }

    public long getLiveRoomId() {
        PatchProxyResult proxy = PatchProxy.proxy(new Object[0], this, changeQuickRedirect, false, 560);
        if (proxy.isSupported) {
            return ((Long) proxy.result).longValue();
        }
        a aVar = this.ownRoom;
        if (aVar == null) {
            return 0;
        }
        PatchProxyResult proxy2 = PatchProxy.proxy(new Object[0], aVar, a.f81034a, false, 549);
        if (proxy2.isSupported) {
            return ((Long) proxy2.result).longValue();
        }
        if (Lists.isEmpty(aVar.f81035b)) {
            return 0;
        }
        return aVar.f81035b.get(0).longValue();
    }

    public int hashCode() {
        int i;
        int i2;
        int i3;
        int i4;
        int i5;
        int i6;
        int i7;
        int i8;
        int i9;
        int i10;
        int i11;
        int i12;
        int i13;
        int i14;
        int i15;
        int i16;
        int i17;
        int i18;
        int i19;
        int i20;
        int i21;
        int i22;
        int i23;
        int i24 = 0;
        PatchProxyResult proxy = PatchProxy.proxy(new Object[0], this, changeQuickRedirect, false, 551);
        if (proxy.isSupported) {
            return ((Integer) proxy.result).intValue();
        }
        String str = this.nickName;
        if (str != null) {
            i = str.hashCode();
        } else {
            i = 0;
        }
        int i25 = ((i * 31) + this.gender) * 31;
        String str2 = this.signature;
        if (str2 != null) {
            i2 = str2.hashCode();
        } else {
            i2 = 0;
        }
        long j = this.id;
        long j2 = this.createTime;
        int i26 = (((((((i25 + i2) * 31) + this.level) * 31) + ((int) (j ^ (j >>> 32)))) * 31) + ((int) (j2 ^ (j2 >>> 32)))) * 31;
        String str3 = this.city;
        if (str3 != null) {
            i3 = str3.hashCode();
        } else {
            i3 = 0;
        }
        long j3 = this.birthday;
        int i27 = (((i26 + i3) * 31) + ((int) (j3 ^ (j3 >>> 32)))) * 31;
        ImageModel imageModel = this.avatarThumb;
        if (imageModel != null) {
            i4 = imageModel.hashCode();
        } else {
            i4 = 0;
        }
        int i28 = (i27 + i4) * 31;
        ImageModel imageModel2 = this.avatarMedium;
        if (imageModel2 != null) {
            i5 = imageModel2.hashCode();
        } else {
            i5 = 0;
        }
        int i29 = (i28 + i5) * 31;
        ImageModel imageModel3 = this.avatarLarge;
        if (imageModel3 != null) {
            i6 = imageModel3.hashCode();
        } else {
            i6 = 0;
        }
        int i30 = (i29 + i6) * 31;
        String str4 = this.avatarUrl;
        if (str4 != null) {
            i7 = str4.hashCode();
        } else {
            i7 = 0;
        }
        int i31 = (i30 + i7) * 31;
        List<User> list = this.topFans;
        if (list != null) {
            i8 = list.hashCode();
        } else {
            i8 = 0;
        }
        int i32 = (i31 + i8) * 31;
        String str5 = this.idStr;
        if (str5 != null) {
            i9 = str5.hashCode();
        } else {
            i9 = 0;
        }
        long j4 = this.shortId;
        long j5 = this.fanTicketCount;
        int i33 = (((((((i32 + i9) * 31) + ((int) (j4 ^ (j4 >>> 32)))) * 31) + ((int) (j5 ^ (j5 >>> 32)))) * 31) + (this.isVerified ? 1 : 0)) * 31;
        String str6 = this.verifiedReason;
        if (str6 != null) {
            i10 = str6.hashCode();
        } else {
            i10 = 0;
        }
        int i34 = (((i33 + i10) * 31) + this.topVipNo) * 31;
        n nVar = this.userHonor;
        if (nVar != null) {
            i11 = nVar.hashCode();
        } else {
            i11 = 0;
        }
        int i35 = (i34 + i11) * 31;
        c cVar = this.anchorLevel;
        if (cVar != null) {
            i12 = cVar.hashCode();
        } else {
            i12 = 0;
        }
        int i36 = (i35 + i12) * 31;
        List<ImageModel> list2 = this.userBadges;
        if (list2 != null) {
            i13 = list2.hashCode();
        } else {
            i13 = 0;
        }
        int i37 = (i36 + i13) * 31;
        List<ImageModel> list3 = this.newUserBadges;
        if (list3 != null) {
            i14 = list3.hashCode();
        } else {
            i14 = 0;
        }
        int i38 = (((i37 + i14) * 31) + this.linkMicStats) * 31;
        String str7 = this.mAvatarThumbStr;
        if (str7 != null) {
            i15 = str7.hashCode();
        } else {
            i15 = 0;
        }
        int i39 = (i38 + i15) * 31;
        String str8 = this.mAvatarMediumStr;
        if (str8 != null) {
            i16 = str8.hashCode();
        } else {
            i16 = 0;
        }
        int i40 = (i39 + i16) * 31;
        String str9 = this.mAvatarLargeStr;
        if (str9 != null) {
            i17 = str9.hashCode();
        } else {
            i17 = 0;
        }
        int i41 = (((i40 + i17) * 31) + (this.enableShowCommerceSale ? 1 : 0)) * 31;
        String str10 = this.backgroundImgUrl;
        if (str10 != null) {
            i18 = str10.hashCode();
        } else {
            i18 = 0;
        }
        int i42 = (i41 + i18) * 31;
        String str11 = this.telephone;
        if (str11 != null) {
            i19 = str11.hashCode();
        } else {
            i19 = 0;
        }
        long j6 = this.modifyTime;
        int i43 = (((((((((i42 + i19) * 31) + this.experience) * 31) + this.status) * 31) + ((int) (j6 ^ (j6 >>> 32)))) * 31) + this.secret) * 31;
        String str12 = this.shareQrcodeUri;
        if (str12 != null) {
            i20 = str12.hashCode();
        } else {
            i20 = 0;
        }
        int i44 = (((i43 + i20) * 31) + this.incomeSharePercent) * 31;
        List<ImageModel> list4 = this.badgeImageList;
        if (list4 != null) {
            i21 = list4.hashCode();
        } else {
            i21 = 0;
        }
        int i45 = (i44 + i21) * 31;
        FollowInfo followInfo2 = this.followInfo;
        if (followInfo2 != null) {
            i22 = followInfo2.hashCode();
        } else {
            i22 = 0;
        }
        int i46 = (i45 + i22) * 31;
        l lVar = this.userAttr;
        if (lVar != null) {
            i23 = lVar.hashCode();
        } else {
            i23 = 0;
        }
        int i47 = (i46 + i23) * 31;
        b bVar = this.anchorInfo;
        if (bVar != null) {
            i24 = bVar.hashCode();
        }
        return i47 + i24;
    }

    public void setAVatarMediumStr(String str) {
        this.mAvatarMediumStr = str;
    }

    public void setAnchorInfo(b bVar) {
        this.anchorInfo = bVar;
    }

    public void setAnchorLevel(c cVar) {
        this.anchorLevel = cVar;
    }

    public void setAuthorInfo(d dVar) {
        this.authorInfo = dVar;
    }

    public void setAvatarBorder(ImageModel imageModel) {
        this.avatarBorder = imageModel;
    }

    public void setAvatarLarge(ImageModel imageModel) {
        this.avatarLarge = imageModel;
    }

    public void setAvatarLargeStr(String str) {
        this.mAvatarLargeStr = str;
    }

    public void setAvatarMedium(ImageModel imageModel) {
        this.avatarMedium = imageModel;
    }

    public void setAvatarThumb(ImageModel imageModel) {
        this.avatarThumb = imageModel;
    }

    public void setAvatarThumbStr(String str) {
        this.mAvatarThumbStr = str;
    }

    public void setAvatarUrl(String str) {
        this.avatarUrl = str;
    }

    public void setBackgroundImgUrl(String str) {
        this.backgroundImgUrl = str;
    }

    public void setBadgeImageList(List<ImageModel> list) {
        this.badgeImageList = list;
    }

    public void setBirthday(long j) {
        this.birthday = j;
    }

    public void setBorder(e eVar) {
        this.border = eVar;
    }

    public void setCity(String str) {
        this.city = str;
    }

    public void setCommerceUserLevel(int i) {
        this.commerceUserLevel = i;
    }

    public void setCreateTime(long j) {
        this.createTime = j;
    }

    public void setDisplayId(String str) {
        this.displayId = str;
    }

    public void setEnableShowCommerceSale(boolean z) {
        this.enableShowCommerceSale = z;
    }

    public void setEncryptedId(String str) {
        this.encryptedId = str;
    }

    public void setEnterprise(int i) {
        this.enterprise = i;
    }

    public void setExperience(int i) {
        this.experience = i;
    }

    public void setFanTicketCount(long j) {
        this.fanTicketCount = j;
    }

    public void setFansClub(FansClubMember fansClubMember) {
        this.fansClub = fansClubMember;
    }

    public void setFollowInfo(FollowInfo followInfo2) {
        this.followInfo = followInfo2;
    }

    public void setFraternityInfo(FraternityInfo fraternityInfo2) {
        this.fraternityInfo = fraternityInfo2;
    }

    public void setGender(int i) {
        this.gender = i;
    }

    public void setId(long j) {
        this.id = j;
    }

    public void setIdStr(String str) {
        this.idStr = str;
    }

    public void setIncomeSharePercent(int i) {
        this.incomeSharePercent = i;
    }

    public void setLevel(int i) {
        this.level = i;
    }

    @SerializedName("link_mic_stats")
    public void setLinkMicStats(int i) {
        this.linkMicStats = i;
    }

    public void setLogPb(String str) {
        this.logPb = str;
    }

    public void setMedal(ImageModel imageModel) {
        this.medal = imageModel;
    }

    public void setModifyTime(long j) {
        this.modifyTime = j;
    }

    public void setNeverRecharge(boolean z) {
        this.neverRecharge = z;
    }

    public void setNewUserBadges(List<ImageModel> list) {
        this.newUserBadges = list;
    }

    public void setNickName(String str) {
        this.nickName = str;
    }

    public void setNobleLevelInfo(NobleLevelInfo nobleLevelInfo2) {
        this.nobleLevelInfo = nobleLevelInfo2;
    }

    public void setPersonalCard(ImageModel imageModel) {
        this.personalCard = imageModel;
    }

    public void setRequestId(String str) {
        this.requestId = str;
    }

    public void setRoomAutoGiftThanks(boolean z) {
        this.roomAutoGiftThanks = z;
    }

    public void setSecUid(String str) {
        this.secUid = str;
    }

    public void setSecret(int i) {
        this.secret = i;
    }

    public void setShareQrcodeUri(String str) {
        this.shareQrcodeUri = str;
    }

    public void setShortId(long j) {
        this.shortId = j;
    }

    public void setShouldUseRealName(boolean z) {
        this.shouldUseRealName = z;
    }

    public void setSignature(String str) {
        this.signature = str;
    }

    public void setSpecialId(String str) {
        this.specialId = str;
    }

    public void setStatus(int i) {
        this.status = i;
    }

    public void setTelephone(String str) {
        this.telephone = str;
    }

    public void setTopFans(List<User> list) {
        this.topFans = list;
    }

    public void setTopVipNo(int i) {
        this.topVipNo = i;
    }

    public void setUserAttr(l lVar) {
        this.userAttr = lVar;
    }

    public void setUserBadges(List<ImageModel> list) {
        this.userBadges = list;
    }

    public void setUserHonor(n nVar) {
        this.userHonor = nVar;
    }

    public void setUserRole(int i) {
        this.userRole = i;
    }

    public void setUserVipInfo(UserVipInfo userVipInfo2) {
        this.userVipInfo = userVipInfo2;
    }

    public void setVerified(boolean z) {
        this.isVerified = z;
    }

    public void setVerifiedContent(String str) {
        this.verifiedContent = str;
    }

    public void setVerifiedReason(String str) {
        this.verifiedReason = str;
    }

    public void setXiguaUserParams(o oVar) {
        this.xiguaUserParams = oVar;
    }

    public void setPayScores(long j) {
        this.payScores = j;
        if (j > 0) {
            this.neverRecharge = false;
        }
    }

    public void setFollowStatus(int i) {
        FollowInfo followInfo2;
        if (!PatchProxy.proxy(new Object[]{Integer.valueOf(i)}, this, changeQuickRedirect, false, 565).isSupported && (followInfo2 = this.followInfo) != null) {
            followInfo2.setFollowStatus((long) i);
        }
    }

    public void setWithCommercePermission(boolean z) {
        if (!PatchProxy.proxy(new Object[]{Byte.valueOf(z ? (byte) 1 : 0)}, this, changeQuickRedirect, false, 566).isSupported) {
            setEnableShowCommerceSale(z);
        }
    }

    public static User from(j jVar) {
        PatchProxyResult proxy = PatchProxy.proxy(new Object[]{jVar}, (Object) null, changeQuickRedirect, true, 553);
        if (proxy.isSupported) {
            return (User) proxy.result;
        }
        if (jVar == null) {
            return null;
        }
        if (jVar instanceof User) {
            Gson a2 = com.bytedance.android.live.a.a();
            return (User) a2.fromJson(a2.toJson((Object) jVar), User.class);
        }
        User user = new User();
        user.initWith(jVar);
        return user;
    }

    public boolean equals(Object obj) {
        PatchProxyResult proxy = PatchProxy.proxy(new Object[]{obj}, this, changeQuickRedirect, false, 563);
        if (proxy.isSupported) {
            return ((Boolean) proxy.result).booleanValue();
        }
        if (this == obj) {
            return true;
        }
        if (obj != null && getClass() == obj.getClass()) {
            User user = (User) obj;
            if (this.gender != user.gender || this.level != user.level || this.id != user.id || this.createTime != user.createTime || this.birthday != user.birthday || this.shortId != user.shortId || this.fanTicketCount != user.fanTicketCount || this.isVerified != user.isVerified || this.topVipNo != user.topVipNo || getLiveRoomId() != user.getLiveRoomId() || this.linkMicStats != user.linkMicStats || this.enableShowCommerceSale != user.enableShowCommerceSale) {
                return false;
            }
            String str = this.nickName;
            if (str == null ? user.nickName != null : !str.equals(user.nickName)) {
                return false;
            }
            String str2 = this.signature;
            if (str2 == null ? user.signature != null : !str2.equals(user.signature)) {
                return false;
            }
            String str3 = this.city;
            if (str3 == null ? user.city != null : !str3.equals(user.city)) {
                return false;
            }
            ImageModel imageModel = this.avatarThumb;
            if (imageModel == null ? user.avatarThumb != null : !imageModel.equals(user.avatarThumb)) {
                return false;
            }
            ImageModel imageModel2 = this.avatarMedium;
            if (imageModel2 == null ? user.avatarMedium != null : !imageModel2.equals(user.avatarMedium)) {
                return false;
            }
            ImageModel imageModel3 = this.avatarLarge;
            if (imageModel3 == null ? user.avatarLarge != null : !imageModel3.equals(user.avatarLarge)) {
                return false;
            }
            String str4 = this.avatarUrl;
            if (str4 == null ? user.avatarUrl != null : !str4.equals(user.avatarUrl)) {
                return false;
            }
            List<User> list = this.topFans;
            if (list == null ? user.topFans != null : !list.equals(user.topFans)) {
                return false;
            }
            String str5 = this.idStr;
            if (str5 == null ? user.idStr != null : !str5.equals(user.idStr)) {
                return false;
            }
            String str6 = this.verifiedReason;
            if (str6 == null ? user.verifiedReason != null : !str6.equals(user.verifiedReason)) {
                return false;
            }
            n nVar = this.userHonor;
            if (nVar == null ? user.userHonor != null : !nVar.equals(user.userHonor)) {
                return false;
            }
            c cVar = this.anchorLevel;
            if (cVar == null ? user.anchorLevel != null : !cVar.equals(user.anchorLevel)) {
                return false;
            }
            List<ImageModel> list2 = this.userBadges;
            if (list2 == null ? user.userBadges != null : !list2.equals(user.userBadges)) {
                return false;
            }
            List<ImageModel> list3 = this.newUserBadges;
            if (list3 == null ? user.newUserBadges != null : !list3.equals(user.newUserBadges)) {
                return false;
            }
            String str7 = this.mAvatarThumbStr;
            if (str7 == null ? user.mAvatarThumbStr != null : !str7.equals(user.mAvatarThumbStr)) {
                return false;
            }
            String str8 = this.mAvatarMediumStr;
            if (str8 == null ? user.mAvatarMediumStr != null : !str8.equals(user.mAvatarMediumStr)) {
                return false;
            }
            String str9 = this.mAvatarLargeStr;
            if (str9 == null ? user.mAvatarLargeStr != null : !str9.equals(user.mAvatarLargeStr)) {
                return false;
            }
            String str10 = this.backgroundImgUrl;
            if (str10 == null ? user.backgroundImgUrl != null : !str10.equals(user.backgroundImgUrl)) {
                return false;
            }
            String str11 = this.telephone;
            if (str11 == null ? user.telephone != null : !str11.equals(user.telephone)) {
                return false;
            }
            if (this.experience != user.experience || this.status != user.status || this.modifyTime != user.modifyTime || this.secret != user.secret) {
                return false;
            }
            String str12 = this.shareQrcodeUri;
            if (str12 == null ? user.shareQrcodeUri != null : !str12.equals(user.shareQrcodeUri)) {
                return false;
            }
            if (this.incomeSharePercent != user.incomeSharePercent) {
                return false;
            }
            List<ImageModel> list4 = this.badgeImageList;
            if (list4 == null ? user.badgeImageList != null : !list4.equals(user.badgeImageList)) {
                return false;
            }
            FollowInfo followInfo2 = this.followInfo;
            if (followInfo2 == null ? user.followInfo != null : !followInfo2.equals(user.followInfo)) {
                return false;
            }
            l lVar = this.userAttr;
            if (lVar == null ? user.userAttr != null : !lVar.equals(user.userAttr)) {
                return false;
            }
            b bVar = this.anchorInfo;
            b bVar2 = user.anchorInfo;
            if (bVar != null) {
                return bVar.equals(bVar2);
            }
            if (bVar2 == null) {
                return true;
            }
        }
        return false;
    }

    /* access modifiers changed from: package-private */
    public void initWith(j jVar) {
        ArrayList arrayList;
        n nVar;
        c cVar;
        ArrayList arrayList2;
        ArrayList arrayList3;
        ArrayList arrayList4;
        if (!PatchProxy.proxy(new Object[]{jVar}, this, changeQuickRedirect, false, 557).isSupported) {
            this.enableShowCommerceSale = jVar.isEnableShowCommerceSale();
            this.fanTicketCount = jVar.getFanTicketCount();
            this.shortId = jVar.getShortId();
            this.displayId = jVar.getDisplayId();
            this.avatarUrl = jVar.getAvatarUrl();
            this.avatarThumb = jVar.getAvatarThumb();
            this.avatarMedium = jVar.getAvatarMedium();
            this.avatarLarge = jVar.getAvatarLarge();
            this.city = jVar.getCity();
            this.birthday = jVar.getBirthday();
            this.nickName = jVar.getNickName();
            this.poiInfo = jVar.getPoiInfo();
            this.gender = jVar.getGender();
            this.signature = jVar.getSignature();
            this.level = jVar.getLevel();
            this.id = jVar.getId();
            ArrayList arrayList5 = null;
            if (jVar.getTopFans() != null) {
                arrayList = new ArrayList(jVar.getTopFans());
            } else {
                arrayList = null;
            }
            this.topFans = arrayList;
            this.isVerified = jVar.isVerified();
            this.verifiedReason = jVar.getVerifiedReason();
            this.topVipNo = jVar.getTopVipNo();
            com.bytedance.android.live.base.model.user.a.b userHonor2 = jVar.getUserHonor();
            PatchProxyResult proxy = PatchProxy.proxy(new Object[]{userHonor2}, (Object) null, n.f81077a, true, 568);
            if (proxy.isSupported) {
                nVar = (n) proxy.result;
            } else if (userHonor2 == null) {
                nVar = null;
            } else if (userHonor2 instanceof n) {
                Gson a2 = com.bytedance.android.live.a.a();
                nVar = (n) a2.fromJson(a2.toJson((Object) userHonor2), n.class);
            } else {
                n nVar2 = new n();
                if (!PatchProxy.proxy(new Object[]{userHonor2}, nVar2, n.f81077a, false, 571).isSupported) {
                    nVar2.f81078b = userHonor2.b();
                    nVar2.f81079c = userHonor2.c();
                    nVar2.f81080d = userHonor2.d();
                    nVar2.f81081e = userHonor2.e();
                    nVar2.f = userHonor2.f();
                    nVar2.g = userHonor2.g();
                    nVar2.h = userHonor2.h();
                    nVar2.i = userHonor2.i();
                    nVar2.j = userHonor2.j();
                    nVar2.k = userHonor2.m();
                    nVar2.l = userHonor2.k();
                    nVar2.o = userHonor2.n();
                    nVar2.m = userHonor2.o();
                    nVar2.n = userHonor2.l();
                    if (userHonor2.p() != null) {
                        arrayList4 = new ArrayList(userHonor2.p());
                    } else {
                        arrayList4 = null;
                    }
                    nVar2.p = arrayList4;
                    nVar2.q = userHonor2.q();
                    nVar2.r = userHonor2.r();
                    nVar2.s = userHonor2.s();
                    nVar2.t = userHonor2.t();
                    nVar2.u = userHonor2.u();
                }
                nVar = nVar2;
            }
            this.userHonor = nVar;
            com.bytedance.android.live.base.model.user.a.a anchorLevel2 = jVar.getAnchorLevel();
            PatchProxyResult proxy2 = PatchProxy.proxy(new Object[]{anchorLevel2}, (Object) null, c.f81043a, true, 516);
            if (proxy2.isSupported) {
                cVar = (c) proxy2.result;
            } else if (anchorLevel2 == null) {
                cVar = null;
            } else if (anchorLevel2 instanceof c) {
                cVar = (c) anchorLevel2;
            } else {
                c cVar2 = new c();
                if (!PatchProxy.proxy(new Object[]{anchorLevel2}, cVar2, c.f81043a, false, 519).isSupported) {
                    cVar2.f81044b = anchorLevel2.a();
                    cVar2.f81045c = anchorLevel2.b();
                    cVar2.f81046d = anchorLevel2.c();
                    cVar2.f81047e = anchorLevel2.d();
                    cVar2.f = anchorLevel2.e();
                    cVar2.g = anchorLevel2.f();
                    cVar2.h = anchorLevel2.g();
                    cVar2.i = anchorLevel2.h();
                    cVar2.j = anchorLevel2.i();
                    cVar2.k = anchorLevel2.j();
                    cVar2.l = anchorLevel2.k();
                    cVar2.m = anchorLevel2.l();
                    cVar2.n = anchorLevel2.m();
                }
                cVar = cVar2;
            }
            this.anchorLevel = cVar;
            this.createTime = jVar.getCreateTime();
            this.ownRoom = jVar.getOwnRoom();
            this.linkMicStats = jVar.getLinkMicStats();
            if (jVar.getUserBadges() != null) {
                arrayList2 = new ArrayList(jVar.getUserBadges());
            } else {
                arrayList2 = null;
            }
            this.userBadges = arrayList2;
            if (jVar.getNewUserBadges() != null) {
                arrayList3 = new ArrayList(jVar.getNewUserBadges());
            } else {
                arrayList3 = null;
            }
            this.newUserBadges = arrayList3;
            this.backgroundImgUrl = jVar.getBackgroundImgUrl();
            this.telephone = jVar.getTelephone();
            this.experience = jVar.getExperience();
            this.status = jVar.getStatus();
            this.modifyTime = jVar.getModifyTime();
            this.secret = jVar.getSecret();
            this.shareQrcodeUri = jVar.getShareQrcodeUri();
            this.incomeSharePercent = jVar.getIncomeSharePercent();
            if (jVar.getBadgeImageList() != null) {
                arrayList5 = new ArrayList(jVar.getBadgeImageList());
            }
            this.badgeImageList = arrayList5;
            this.followInfo = jVar.getFollowInfo();
            this.userAttr = jVar.getUserAttr();
            this.anchorInfo = jVar.getAnchorInfo();
            this.secUid = jVar.getSecUid();
            this.enterprise = jVar.getEnterprise();
        }
    }

    public void setVcdAdversaryAuthorizeState(boolean z, boolean z2) {
        this.adversaryAuthorizationInfo = 0;
        if (z) {
            this.adversaryAuthorizationInfo |= 1;
        }
        if (z2) {
            this.adversaryAuthorizationInfo |= 2;
        }
    }
}