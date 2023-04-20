{
  state === t('placeholders.settings.viewall') ? (
    <FlatList
      key={'_'}
      keyExtractor={item => '_' + item.id}
      data={bookingList.data}
      horizontal={false}
      renderItem={({item, index}) => (
        <>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BookingListDetail', {
                bookingId: item.id,
              })
            }
            style={styles.bookingWrapper}>
            <View style={styles.leftImageWrapper}>
              <View style={styles.imagebackgroundwrappper}>
                <Image
                  source={require('../../../assets/images/userProfile.png')}
                  style={styles.imageBox}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.bookingTopWrapper}>
                <Text style={styles.bookingLeftText}>
                  {t('placeholders.bookingList.booking')} #{item.id}
                </Text>
                <Text style={styles.bookingBottomText}>
                  {item.service_name}
                </Text>
              </View>
              <View style={{justifyContent: 'flex-start', marginTop: -hp(4)}}>
                <Text style={styles.bookingLeftText}>{item.date}</Text>
              </View>
            </View>
            <View
              style={[
                styles.approvedWrapper,
                {
                  backgroundColor:
                    item.status === 'Pending'
                      ? '#f2ac00'
                      : item.status == 'Cancelled'
                      ? '#da3348'
                      : item.status == 'Completed'
                      ? '#2ea749'
                      : item.status == 'Approved'
                      ? '#157dfc'
                      : item.status == 'In Progress'
                      ? '#157dfc'
                      : item.status == 'Awaiting'
                      ? '#ff8c00'
                      : null,
                },
              ]}>
              <Text style={styles.approvedText}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    />
  ) : state === t('placeholders.settings.pending') ? (
    <FlatList
      key={'_'}
      keyExtractor={item => '_' + item.id}
      data={bookingList.data}
      horizontal={false}
      renderItem={({item, index}) => (
        <>
          {item.status === state ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('BookingListDetail', {
                  bookingId: item.id,
                })
              }
              style={styles.bookingWrapper}>
              <View style={styles.leftImageWrapper}>
                <View style={styles.imagebackgroundwrappper}>
                  <Image
                    source={require('../../../assets/images/userProfile.png')}
                    style={styles.imageBox}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.bookingTopWrapper}>
                  <Text style={styles.bookingLeftText}>
                    {t('placeholders.bookingList.booking')} #{item.id}
                  </Text>
                  <Text style={styles.bookingBottomText}>
                    {item.service_name}
                  </Text>
                </View>
                <View style={{justifyContent: 'flex-start', marginTop: -hp(4)}}>
                  <Text style={styles.bookingLeftText}>{item.date}</Text>
                </View>
              </View>
              <View
                style={[styles.approvedWrapper, {backgroundColor: '#f2ac00'}]}>
                <Text style={styles.approvedText}>
                  {item.status === state ? item.status : null}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </>
      )}
    />
  ) : state === t('placeholders.settings.cancelled') ? (
    <FlatList
      key={'_'}
      keyExtractor={item => '_' + item.id}
      data={bookingList.data}
      horizontal={false}
      renderItem={({item, index}) => (
        <>
          {state === item.status ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('BookingListDetail', {
                  bookingId: item.id,
                })
              }
              style={styles.bookingWrapper}>
              <View style={styles.leftImageWrapper}>
                <View style={styles.imagebackgroundwrappper}>
                  <Image
                    source={require('../../../assets/images/userProfile.png')}
                    style={styles.imageBox}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.bookingTopWrapper}>
                  <Text style={styles.bookingLeftText}>
                    {t('placeholders.bookingList.booking')} #{item.id}
                  </Text>
                  <Text style={styles.bookingBottomText}>
                    {item.service_name}
                  </Text>
                </View>
                <View style={{justifyContent: 'flex-start', marginTop: -hp(4)}}>
                  <Text style={styles.bookingLeftText}>{item.date}</Text>
                </View>
              </View>

              <View
                style={[styles.approvedWrapper, {backgroundColor: '#da3348'}]}>
                <Text style={styles.approvedText}>
                  {item.status === state ? item.status : null}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </>
      )}
    />
  ) : state === t('placeholders.settings.completed') ? (
    <FlatList
      key={'_'}
      keyExtractor={item => '_' + item.id}
      data={bookingList.data}
      horizontal={false}
      renderItem={({item, index}) => (
        <>
          {item.status === state ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('BookingListDetail', {
                  bookingId: item.id,
                })
              }
              style={styles.bookingWrapper}>
              <View style={styles.leftImageWrapper}>
                <View style={styles.imagebackgroundwrappper}>
                  <Image
                    source={require('../../../assets/images/userProfile.png')}
                    style={styles.imageBox}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.bookingTopWrapper}>
                  <Text style={styles.bookingLeftText}>
                    {t('placeholders.bookingList.booking')} #{item.id}
                  </Text>
                  <Text style={styles.bookingBottomText}>
                    {item.service_name}
                  </Text>
                </View>
                <View style={{justifyContent: 'flex-start', marginTop: -hp(4)}}>
                  <Text style={styles.bookingLeftText}>{item.date}</Text>
                </View>
              </View>

              <View
                style={[styles.approvedWrapper, {backgroundColor: '#2ea749'}]}>
                <Text style={styles.approvedText}>
                  {/* {item.status} */}
                  {item.status === state ? item.status : null}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </>
      )}
    />
  ) : state === t('placeholders.settings.inprogress') ? (
    <FlatList
      key={'_'}
      keyExtractor={item => '_' + item.id}
      data={bookingList.data}
      horizontal={false}
      renderItem={({item, index}) => (
        <>
          {item.status === state ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('BookingListDetail', {
                  bookingId: item.id,
                })
              }
              style={styles.bookingWrapper}>
              <View style={styles.leftImageWrapper}>
                <View style={styles.imagebackgroundwrappper}>
                  <Image
                    source={require('../../../assets/images/userProfile.png')}
                    style={styles.imageBox}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.bookingTopWrapper}>
                  <Text style={styles.bookingLeftText}>
                    {t('placeholders.bookingList.booking')} #{item.id}
                  </Text>
                  <Text style={styles.bookingBottomText}>
                    {item.service_name}
                  </Text>
                </View>
                <View style={{justifyContent: 'flex-start', marginTop: -hp(4)}}>
                  <Text style={styles.bookingLeftText}>{item.date}</Text>
                </View>
              </View>

              <View
                style={[styles.approvedWrapper, {backgroundColor: '#157dfc'}]}>
                <Text style={styles.approvedText}>
                  {item.status === state ? item.status : null}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </>
      )}
    />
  ) : state === t('placeholders.settings.approved') ? (
    <FlatList
      key={'_'}
      keyExtractor={item => '_' + item.id}
      data={bookingList.data}
      horizontal={false}
      renderItem={({item, index}) => (
        <>
          {item.status === state ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('BookingListDetail', {
                  bookingId: item.id,
                })
              }
              style={styles.bookingWrapper}>
              <View style={styles.leftImageWrapper}>
                <View style={styles.imagebackgroundwrappper}>
                  <Image
                    source={require('../../../assets/images/userProfile.png')}
                    style={styles.imageBox}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.bookingTopWrapper}>
                  <Text style={styles.bookingLeftText}>
                    {t('placeholders.bookingList.booking')} #{item.id}
                  </Text>
                  <Text style={styles.bookingBottomText}>
                    {item.service_name}
                  </Text>
                </View>
                <View style={{justifyContent: 'flex-start', marginTop: -hp(4)}}>
                  <Text style={styles.bookingLeftText}>{item.date}</Text>
                </View>
              </View>

              <View
                style={[styles.approvedWrapper, {backgroundColor: '#157dfc'}]}>
                <Text style={styles.approvedText}>
                  {item.status === state ? item.status : null}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </>
      )}
    />
  ) : state === t('placeholders.settings.awaiting') ? (
    <FlatList
      key={'_'}
      keyExtractor={item => '_' + item.id}
      data={bookingList.data}
      horizontal={false}
      renderItem={({item, index}) => (
        <>
          {item.status === state ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('BookingListDetail', {
                  bookingId: item.id,
                })
              }
              style={styles.bookingWrapper}>
              <View style={styles.leftImageWrapper}>
                <View style={styles.imagebackgroundwrappper}>
                  <Image
                    source={require('../../../assets/images/userProfile.png')}
                    style={styles.imageBox}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.bookingTopWrapper}>
                  <Text style={styles.bookingLeftText}>
                    {t('placeholders.bookingList.booking')} #{item.id}
                  </Text>
                  <Text style={styles.bookingBottomText}>
                    {item.service_name}
                  </Text>
                </View>
                <View style={{justifyContent: 'flex-start', marginTop: -hp(4)}}>
                  <Text style={styles.bookingLeftText}>{item.date}</Text>
                </View>
              </View>

              <View
                style={[styles.approvedWrapper, {backgroundColor: '#ff8c00'}]}>
                <Text style={styles.approvedText}>
                  {item.status === state ? item.status : null}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </>
      )}
    />
  ) : null;
}
