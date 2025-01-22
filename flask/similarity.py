import cv2
import numpy as np

#orb feature mapping

def similarity(s,img1,img2):
    
    img1 = cv2.imread(img1)
    img2 = cv2.imread(img2)

    if img1 is None:
        print("Error: Couldn't load previous_day_image.jpg")
    if img2 is None:
        print("Error: Couldn't load today_image.jpg")
        
    height1, width1 = img1.shape[:2]
    img2_resized = cv2.resize(img2, (width1, height1))

   
    gray1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    gray2 = cv2.cvtColor(img2_resized, cv2.COLOR_BGR2GRAY)

    diff = cv2.absdiff(gray1, gray2)

    _, thresh = cv2.threshold(diff, 30, 255, cv2.THRESH_BINARY)

    orb = cv2.ORB_create()

    kp1, des1 = orb.detectAndCompute(img1, None)
    kp2, des2 = orb.detectAndCompute(img2_resized, None)

    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)

    matches = bf.match(des1, des2)

    matches = sorted(matches, key=lambda x: x.distance)

    # Draw matches
    result_img = cv2.drawMatches(img1, kp1, img2_resized, kp2, matches[:10], None, flags=2)

    # Display the result
    '''
    cv2.imshow('ORB Feature Matching', result_img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    '''

    # Step 4: Histogram Comparison
    hsv_img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2HSV)
    hsv_img2 = cv2.cvtColor(img2_resized, cv2.COLOR_BGR2HSV)

    hist1 = cv2.calcHist([hsv_img1], [0, 1], None, [50, 60], [0, 180, 0, 256])
    hist2 = cv2.calcHist([hsv_img2], [0, 1], None, [50, 60], [0, 180, 0, 256])

    cv2.normalize(hist1, hist1, 0, 1, cv2.NORM_MINMAX)
    cv2.normalize(hist2, hist2, 0, 1, cv2.NORM_MINMAX)

    # Compare the histograms using correlation
    similarity = cv2.compareHist(hist1, hist2, cv2.HISTCMP_CORREL)

    print(f"Similarity between images (Histogram Comparison): {similarity}")

    
    if(s==1 or s==5 or s==6 ):
        percent=progress(similarity)
    if( s==2 or s==3):
        percent=progress(similarity)
    if(s==0 or s==4):
        percent=progress(similarity)

    return percent


def progress(similarity):
    if similarity == 1:
        return 0  # "no changes"
    elif 0 < similarity < 1:
        if 0.7 < similarity <= 1:
            return 30 
        elif 0.4 < similarity <= 0.7:
            return 50
        elif 0 < similarity <= 0.4:
            return 70  
    elif -1 <= similarity < 0:
        return -1  # "wrong img"
    
