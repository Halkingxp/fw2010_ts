# fw2010_ts
fw2010_ts


# 解决iOS 启动页 短暂黑屏的问题
    可以在AppController.mm中，插一张图片显示即可，这张图片和启动页用一样的图片就行

![avatar](/mdimgs/1.png)
    或者

    #pragma mark - 获取启动图
    
    +(UIImage *)getLaunchImage{
        CGSize viewSize = [UIScreen mainScreen].bounds.size;
        NSString *launchImage = nil;
        NSArray* imagesDict = [[[NSBundle mainBundle] infoDictionary] valueForKey:@"UILaunchImages"];
        for (NSDictionary* dict in imagesDict)
        {
            CGSize imageSize = CGSizeFromString(dict[@"UILaunchImageSize"]);
            // 横屏改成 @"Landscape"
            if (CGSizeEqualToSize(imageSize, viewSize) && [@"Portrait" isEqualToString:dict[@"UILaunchImageOrientation"]])
            {
            launchImage = dict[@"UILaunchImageName"];
            }
        }
        return [UIImage imageNamed:launchImage];
    }
