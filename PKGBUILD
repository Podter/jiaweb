pkgname=jiaweb
_pkgname=firefox
pkgver=0.1
pkgrel=1
pkgdesc="Reinvent the Internet."
arch=('x86_64')
url="https://www.mozilla.org/en-US/firefox/new/"
license=(MPL GPL LGPL)
depends=(gtk3 libxt mime-types dbus-glib nss ttf-font)
provides=("firefox=107.0.1")
conflicts=('firefox' 'firefox-bin')
source=("https://archive.mozilla.org/pub/firefox/releases/107.0.1/linux-x86_64/en-US/firefox-107.0.1.tar.bz2"
        $_pkgname.sh
        $_pkgname.desktop)
sha256sums=('dd08d4dfb69e379ce680a303c6c89c67056ce1d8ec0276345a8e8a0f04cd7dca'
            'SKIP'
            'SKIP')
validpgpkeys=('14F26682D0916CDD81E37B6D61B7B526D98F0353') # Mozilla Software Releases <release@mozilla.com>

package() {
  # Create directories
  mkdir -p "$pkgdir"/usr/bin
  mkdir -p "$pkgdir"/usr/share/applications
  mkdir -p "$pkgdir"/opt

  # Install
  cp -r firefox/ "$pkgdir"/opt/$pkgname

  # Launchers
  install -m755 $_pkgname.sh "$pkgdir"/usr/bin/$_pkgname

  # Desktops
  install -m644 *.desktop "$pkgdir"/usr/share/applications/

  # Icons
  #for i in 16x16 32x32 48x48 64x64 128x128; do
  #  install -d "$pkgdir"/usr/share/icons/hicolor/$i/apps/
  #  ln -s /opt/$pkgname/browser/chrome/icons/default/default${i/x*}.png \
  #        "$pkgdir"/usr/share/icons/hicolor/$i/apps/$_pkgname.png
  #done

  # Use system-provided dictionaries
  #rm -r "$pkgdir"/opt/$_pkgname/dictionaries
  ln -Ts /usr/share/hunspell "$pkgdir"/opt/$pkgname/dictionaries
  ln -Ts /usr/share/hyphen "$pkgdir"/opt/$pkgname/hyphenation

  # Use system certificates
  #ln -sf /usr/lib/libnssckbi.so "$pkgdir"/opt/$pkgname/libnssckbi.so
}

